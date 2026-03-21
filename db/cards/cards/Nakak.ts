import { Board } from "../../../classes/Board";
import { Player } from "../../../classes/Player";
import { Card } from "../../../classes/Card";
import { Action } from "../../../classes/Action";

import { ICard } from "../../../interfaces/ICard";

import { ActionType, CardClass, Faction, HealthClass, Rarity } from "../../../types/enums";

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
                (card: Card, player: Player, board: Board, _actionType: ActionType): void => {
                    board[`getPlayer${player.getPlayerNumber()}`]().getCards().forEach(a => {
                        if(a.getCardClass() == CardClass.Tank){
                            a.heal(7);
                        }
                    });
                },
            ),
        },
    ],
};
