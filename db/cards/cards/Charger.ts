import { Board } from "../../../classes/Board";
import { Player } from "../../../classes/Player";
import { Card } from "../../../classes/Card";
import { Action } from "../../../classes/Action";

import { ICard } from "../../../interfaces/ICard";

import { TargetingFunction } from "../../../types/types";

import { ActionType, CardClass, DamageType, Faction, HealthClass, Rarity } from "../../../types/enums";

export const Charger: ICard = {
    name: "Charger",
    uid: "CCH001",

    maxHealth: 150,
    maxShields: 0,
    overguard: 0,

    cardClass: CardClass.WinCondition,
    faction: Faction.Infested,
    healthClass: HealthClass.Infested,
    rarity: Rarity.Common,

    actions: [
        {
            action: new Action(
                "Charge",
                "A01CCH001",
                "I001",
                ActionType.OnTurn,
                "Every turn the Charger will deal 5 damage to the Operator",
                (
                    _targetingFunction: TargetingFunction,
                    _card: Card,
                    player: Player,
                    board: Board,
                    _actionType: ActionType,
                ): void => {
                    board[`getPlayer${player.getPlayerNumber() === 1 ? 2 : 1}`]()
                        .getOperator()
                        .takeDamage(50, DamageType.True);
                },
            ),
        },
    ],
};
