import { Board } from "../../../classes/Board";
import { Player } from "../../../classes/Player";
import { Card } from "../../../classes/Card";
import { Action } from "../../../classes/Action";
import { DamageInstance } from "../../../classes/DamageInstance";

import { ICard } from "../../../interfaces/ICard";

import { ActionType, CardClass, Faction, HealthClass, Rarity } from "../../../types/enums";
import { TargetingFunction } from "../../../types/types";

import { targetOperator } from "../targeting/targetingFunctions";

export const DeimosCharger: ICard = {
    name: "Deimos Charger",
    uid: "CDE001",

    maxHealth: 300,
    maxShields: 0,
    overguard: 50,

    cardClass: CardClass.WinCondition,
    faction: Faction.InfestedDeimos,
    healthClass: HealthClass.InfestedDeimos,
    rarity: Rarity.Uncommon,

    actions: [
        {
            action: new Action(
                "Deimos Charge",
                "A01CDE001",
                "I001",
                ActionType.OnTurn,
                "Every turn the Charger will deal 20 True damage to the Operator",
                (
                    tf: TargetingFunction,
                    card: Card,
                    player: Player,
                    board: Board,
                    _actionType: ActionType,
                ): void => {
                    DamageInstance.init(card.chooseTarget(tf, player, board), card, { True: 20 }, 0, 0, 1.5).apply(
                        player,
                    );
                },
                targetOperator,
            ),
        },
    ],
};
