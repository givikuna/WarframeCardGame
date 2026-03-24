import { Board } from "../../../classes/Board";
import { Player } from "../../../classes/Player";
import { Card } from "../../../classes/Card";
import { Action } from "../../../classes/Action";

import { ICard } from "../../../interfaces/ICard";

import { TargetingFunction } from "../../../types/types";

import { ActionType, CardClass, Faction, HealthClass, Rarity } from "../../../types/enums";

export const Boon: ICard = {
    name: "Boon",
    uid: "CBO001",

    maxHealth: 100,
    maxShields: 50,
    overguard: 0,

    cardClass: CardClass.Support,
    faction: Faction.Ventkids,
    healthClass: HealthClass.Corpus,
    rarity: Rarity.Common,

    actions: [
        {
            action: new Action(
                "K-Drive Robbery",
                "A01CBO001",
                "I001",
                ActionType.OnTurn,
                "Every turn Boon'll give the player 20 credits",
                (
                    _targetingFunction: TargetingFunction,
                    _card: Card,
                    player: Player,
                    _board: Board,
                    _actionType: ActionType,
                ): void => {
                    player.giveCredits(20);
                },
            ),
        },
    ],
};
