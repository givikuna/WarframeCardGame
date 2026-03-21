import { Board } from "../../../classes/Board";
import { Player } from "../../../classes/Player";
import { Card } from "../../../classes/Card";
import { Action } from "../../../classes/Action";

import { ICard } from "../../../interfaces/ICard";

import { ActionType, CardClass, DamageType, Faction, HealthClass, Rarity } from "../../../types/enums";

export const Charger: ICard = {
    name: "Charger",
    uid: "CCH001",

    maxHealth: 100,
    maxShields: 0,
    overguard: 0,

    cardClass: CardClass.WinCondition,
    faction: Faction.Infested,
    healthClass: HealthClass.Infested,
    rarity: Rarity.Common,
    actions: [
        {
            action: new Action(
                "Charger",
                "A01CCH001",
                "I001",
                ActionType.OnTurn,
                "Deals damage to operator",
                (card: Card, player: Player, board: Board, _actionType: ActionType): void => {
                    board[`getPlayer${player.getPlayerNumber() === 1 ? 2 : 1}`]().getOperator().takeDamage(50,DamageType.True);
                },
            ),
        },
    ],
};
