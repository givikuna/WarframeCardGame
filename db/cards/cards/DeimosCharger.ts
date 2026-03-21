import { Board } from "../../../classes/Board";
import { Player } from "../../../classes/Player";
import { Card } from "../../../classes/Card";
import { Action } from "../../../classes/Action";

import { ICard } from "../../../interfaces/ICard";

import { ActionType, CardClass, Faction, HealthClass, Rarity } from "../../../types/enums";
import { TargetingFunction } from "../../../types/types";

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
                "Every turn the Charger will deal 15 damage to the Operator",
                (_tf: TargetingFunction, _card: Card, player: Player, board: Board, _actionType: ActionType): void => {
                    board[`getPlayer${player.getPlayerNumber()}`]().getOperator().takeDamage(15);
                },
            ),
        },
    ],
};
