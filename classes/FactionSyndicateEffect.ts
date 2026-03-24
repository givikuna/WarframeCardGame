import { Board } from "./Board";
import { Player } from "./Player";
import { Card } from "./Card";
import { DamageInstance } from "./DamageInstance";

import { Effect } from "../interfaces/Effect";

import { FactionSyndicate, SyndicateEffect } from "../types/enums";

import { DamageTypePerSyndicateEffect, FactionSyndicateToEffect } from "../constants/constants";

import { noop } from "underscore";

export class FactionSyndicateEffect implements Effect {
    private faction: FactionSyndicate;
    private effect: SyndicateEffect;

    public constructor(faction: FactionSyndicate) {
        this.faction = faction;

        this.effect = FactionSyndicateToEffect[this.faction];
    }

    public static init(faction: FactionSyndicate): FactionSyndicateEffect {
        return new FactionSyndicateEffect(faction);
    }

    public getFactionSyndicate(): FactionSyndicate {
        return this.faction;
    }

    public getSyndicateEffect(): SyndicateEffect {
        return this.effect;
    }

    public applyEffect(board: Board, by: Player) {
        (board[`getPlayer${by.getPlayerNumber() === 1 ? 2 : 1}`] as () => Player)()
            .getCards()
            .forEach((card: Card): void => {
                DamageInstance.init(
                    card,
                    this,
                    { [DamageTypePerSyndicateEffect[FactionSyndicateToEffect[this.getFactionSyndicate()]]]: 50 },
                    100,
                    0,
                    1,
                ).apply(by, board);
            });

        const cardHealthRestore: () => void = (): void =>
            board[`getPlayer${by.getPlayerNumber()}`]()
                .getCards()
                .forEach((card: Card): void => card.heal(Math.floor(card.getMaxHealth() * 0.25)));

        const restoreHealthToOperator: () => void = (): void =>
            board[`getPlayer${by.getPlayerNumber()}`]().getOperator().heal(200);

        const cardShieldRestore: () => void = (): void =>
            board[`getPlayer${by.getPlayerNumber()}`]()
                .getCards()
                .forEach((card: Card): void => card.giveShield(card.getMaxShields() * 0.25));

        switch (this.getFactionSyndicate()) {
            case FactionSyndicate.SteelMeridian:
                cardHealthRestore();
                break;
            case FactionSyndicate.ArbitersOfHexis:
                cardHealthRestore();
                break;
            case FactionSyndicate.CephalonSuda:
                restoreHealthToOperator();
                break;
            case FactionSyndicate.ThePerrinSequence:
                cardShieldRestore();
                break;
            case FactionSyndicate.RedVeil:
                restoreHealthToOperator();
                break;
            case FactionSyndicate.NewLoka:
                cardShieldRestore();
                break;
            default:
                noop();
        }
    }
}
