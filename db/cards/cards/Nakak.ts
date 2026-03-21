import { Board } from "../../../classes/Board";
import { Player } from "../../../classes/Player";
import { Card } from "../../../classes/Card";
import { Action } from "../../../classes/Action";

import { ICard } from "../../../interfaces/ICard";

import { ActionType, CardClass, Faction, HealthClass, Rarity } from "../../../types/enums";
import { TargetingFunction } from "../../../types/types";

export const Nakak: ICard = {
    name: "Nakak",
    uid: "CNA001",

    maxHealth: 100,
    maxShields: 0,
    overguard: 0,

    cardClass: CardClass.Support,
    faction: Faction.Ostron,
    healthClass: HealthClass.Ostron,
    rarity: Rarity.Common,

    actions: [
        {
            action: new Action(
                "Nakak",
                "A01CNA001",
                "I001",
                ActionType.OnTurn,
                "Heals every allied tank",
                (_tf: TargetingFunction, _card: Card, player: Player, board: Board, _actionType: ActionType): void => {
                    board[`getPlayer${player.getPlayerNumber()}`]()
                        .getCards()
                        .forEach((a: Card): void => {
                            if (a.getCardClass() == CardClass.Tank) {
                                a.heal(7);
                            }
                        });
                },
            ),
        },
    ],
};
