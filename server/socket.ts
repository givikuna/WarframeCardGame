import { Server, Socket } from "socket.io";

import * as _ from "underscore";

import { Game } from "../game/Game";
import { Board } from "../classes/Board";
import { Player } from "../classes/Player";
import { Card } from "../classes/Card";
import { Ability } from "../classes/Ability";

import { AbilityDTO, CardDTO, GameStateDTO, HandDTO, LocationStateDTO } from "../interfaces/protocol";

import { CardFactory } from "../modules/factories/CardFactory";

import { cards } from "../cards/cards";

const games: Record<string, Game> = {};
const cardLookup: Record<string, Card> = {};

const mapGameToDTO: (game: Game, playerNum: 1 | 2) => GameStateDTO = (game: Game, playerNum: 1 | 2): GameStateDTO => {
    const mapCard = (c: Card): CardDTO => {
        let uid: string = "0";

        try {
            uid = (c as any).uuid; // uuid TBA

            if (!uid) {
                uid = `card_${Math.random().toString(36).substr(2, 9)}`;
                (c as any).uuid = uid;
                cardLookup[uid] = c;
            }
        } catch (e: unknown) {
            uid = `card_${Math.random().toString(36).substr(2, 9)}`;
            (c as any).uuid = uid;
            cardLookup[uid] = c;
        }

        return {
            // Metadata
            id: uid,
            templateId: 1,
            name: c.getName(),
            owner: c.getPlayer() as 1 | 2,
            locationIndex: (c.getLocation() - 1) as 0 | 1 | 2,

            // Stats
            health: c.getHealth(),
            maxHealth: c.getMaxHealth(),
            shields: c.getShields(),
            maxShields: c.getMaxShields(),
            overguard: c.getOverguard(),
            maxOverguard: c.getMaxOverguard(),
            armor: c.getArmor(),
            baseArmor: c.getBaseArmor(),
            energy: c.getEnergy(),
            maxEnergy: c.getMaxEnergy(),
            startingEnergy: c.getStartingEnergy(),
            healthType: c.getHealthType(),

            // Visuals
            faction: c.getFaction(),
            rarity: "Common",
            abilities: c.getAbilities().map((a) => ({
                name: a.getName(),
                cost: a.getCost(),
                description: a.getDescription(),
                fullDetails: a.getFullDescription(),
            })),
            procs: {},
        };
    };

    const locs: [LocationStateDTO, LocationStateDTO, LocationStateDTO] = game
        .getBoard()
        .getLocations()
        .map((loc) => ({
            player1Cards: loc.getPlayerOneCards().map(mapCard),
            player2Cards: loc.getPlayerTwoCards().map(mapCard),
        })) as [LocationStateDTO, LocationStateDTO, LocationStateDTO];

    const p: Player = playerNum === 1 ? game.getPlayer1() : game.getPlayer2();
    const handDTO: HandDTO = { cards: [] };
    p.getHand().forEach((cardId: number): void => {
        const template = cards[cardId];

        handDTO.cards.push({
            id: `hand_${cardId}_${Math.random()}`,
            templateId: cardId,
            name: template.name,

            health: template.maxHealth,
            maxHealth: template.maxHealth,
            shields: template.maxShields,
            maxShields: template.maxShields,
            overguard: template.maxOverguard,
            maxOverguard: template.maxOverguard,
            armor: template.baseArmor,
            baseArmor: template.baseArmor,
            energy: template.startingEnergy,
            maxEnergy: template.maxEnergy,
            startingEnergy: template.startingEnergy,

            faction: template.faction,
            healthType: template.healthType,
            rarity: template.rarity,

            abilities: template.abilities.map((ability: Ability): AbilityDTO => {
                return {
                    name: ability.getName(),
                    cost: ability.getCost(),
                    description: ability.getDescription(),
                    fullDetails: ability.getFullDescription(),
                };
            }),
            procs: {},
        });
    });

    return {
        locations: locs,
        hand: handDTO,
        turn: game.getTurn(),
        activePlayer: 1,
    };
};

// - - - -

export const setupSocket = (io: Server): void => {
    io.on("connection", (socket: Socket): void => {
        console.log(`Tenno Connected: ${socket.id}`);

        socket.on("requestGameStart", (data: { deckIds: number[] }) => {
            let p1Deck: number[] = data.deckIds;
            if (!p1Deck || p1Deck.length !== 20) {
                const allIds: number[] = Object.keys(cards).map(Number);
                p1Deck = Array.from({ length: 20 }, () => allIds[Math.floor(Math.random() * allIds.length)]);
            }

            const board: Board = new Board();
            const p1: Player = new Player(1, p1Deck, board, socket.id, "Tenno");

            // - - - -

            const allIds: number[] = Object.keys(cards).map(Number);
            const aiDeck: number[] = Array.from(
                { length: 20 },
                (): number => allIds[Math.floor(Math.random() * allIds.length)],
            );
            const p2: Player = new Player(2, aiDeck, board, "AI", "Stalker");

            const game = new Game(p1, p2, board);
            games[socket.id] = game;

            // development scenario for testing
            [0, 1, 2].forEach((locIdx: number): void => {
                const excaliburCard: Card = CardFactory.manufacture(cards[1], 2, board, locIdx + 1);
                board.getLocations()[locIdx].playCard(excaliburCard);
            });

            socket.emit("gameStateUpdate", mapGameToDTO(game, 1));
        });

        socket.on("endTurn", (): void => {
            const game: Game = games[socket.id];
            if (!game) return;

            game.nextTurn();

            // To be balanced later. For now lets only allow drawing of one card per turn.
            game.getPlayer1().drawCards(1);
            game.getPlayer2().drawCards(1);

            socket.emit("gameStateUpdate", mapGameToDTO(game, 1));
        });

        socket.on("requestPlayCard", (data) => {
            const game: Game = games[socket.id];
            if (!game) return;

            const p1: Player = game.getPlayer1();
            const hand: number[] = p1.getHand();

            const cardIdx: number = hand.findIndex((id: number): boolean => id === data.cardTemplateId);

            if (cardIdx !== -1) {
                p1.playCard(cardIdx, (data.locationIndex + 1) as 1 | 2 | 3);
                socket.emit("gameStateUpdate", mapGameToDTO(game, 1));
            }
        });

        socket.on("requestAttack", (data) => {
            const attacker: Card = cardLookup[data.sourceId];
            const target: Card = cardLookup[data.targetId];

            if (attacker && target) {
                if (attacker.getLocation() !== target.getLocation()) {
                    // find a way to stop this from being allowed or to cancel the UI from letting this even happen
                    return;
                }

                if (!attacker.canAttack) {
                    // find a way to block them from actually attacking
                    return;
                }

                const type = target.getOverguard() > 0 ? "Overguard" : target.getShields() > 0 ? "Shield" : "Health";

                // Apply Damage (Basic Attack: 50 Slash) for testing for now
                target.applyDamage({
                    calculateDamage: () => ({ health: 50, shield: 0, overguard: 0 }),
                    calculateStatusEffects: () => [],
                    getDDD: () => ({ Slash: 50 }),
                } as any);

                attacker.canAttack = false;

                socket.emit("gameStateUpdate", mapGameToDTO(games[socket.id], 1));
                io.emit("damageDealt", { targetId: data.targetId, damage: 50, type });
            }
        });

        socket.on("requestCastAbility", (data) => {
            const caster = cardLookup[data.casterId];
            const targets = data.targetIds.map((id: string) => cardLookup[id]).filter((c: Card) => c);

            if (caster && targets.length > 0) {
                console.log(`Casting Ability ${data.abilityIndex}`);
                caster.castAbility(data.abilityIndex + 1, targets);

                socket.emit("gameStateUpdate", mapGameToDTO(games[socket.id], 1));
            }
        });

        socket.on("disconnect", () => {
            delete games[socket.id];
        });
    });
};
