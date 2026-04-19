import { Board } from "../../../classes/Board";
import { Player } from "../../../classes/Player";
import { Card } from "../../../classes/Card";
import { Action } from "../../../classes/Action";
import { DamageInstance } from "../../../classes/DamageInstance";

import { ICard } from "../../../interfaces/ICard";

import { TargetingFunction } from "../../../types/types";

import { ActionType, CardClass, Faction, HealthClass, Rarity } from "../../../types/enums";

import { targetOperator } from "../targeting/targetingFunctions";

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
                "Every turn the Charger will deal 10 True damage to the Operator",
                (
                    tf: TargetingFunction,
                    card: Card,
                    player: Player,
                    board: Board,
                    _actionType: ActionType,
                ): void => {
                    DamageInstance.init(card.chooseTarget(tf, player, board), card, { True: 10 }, 0, 0, 1.5).apply(
                        player,
                        board,
                    );
                },
                targetOperator,
            ),
        },
    ],
};
