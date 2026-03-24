import { Board } from "../../../classes/Board";
import { Player } from "../../../classes/Player";
import { Card } from "../../../classes/Card";
import { Action } from "../../../classes/Action";

import { ICard } from "../../../interfaces/ICard";

import { ActionType, CardClass, Faction, HealthClass, Rarity } from "../../../types/enums";
import { DamageInstance } from "../../../classes/DamageInstance";
import { TargetingFunction } from "../../../types/types";

export const Excalibur: ICard = {
    name: "Excalibur",
    uid: "CEX001",

    maxHealth: 250,
    maxShields: 200,
    overguard: 0,

    cardClass: CardClass.Attacker,
    faction: Faction.Tenno,
    healthClass: HealthClass.Tenno,
    rarity: Rarity.Common,

    actions: [
        {
            action: new Action(
                "Slash Dash",
                "A01CEX001",
                "I001",
                ActionType.OnTurn,
                `Excalibur chooses an enemy card to target and will attack it dealing with slash damage every turn.
                Damage: 25 Slash
                Status Chance: 27%
                Critical Chance: 13%
                Critical Damage Multiplier: 1.5x`,
                (
                    tf: TargetingFunction,
                    card: Card,
                    player: Player,
                    board: Board,
                    _actionType: ActionType,
                ): void => {
                    DamageInstance.init(
                        card.chooseTarget(tf, player, board),
                        card,
                        { Slash: 25 },
                        27,
                        13,
                        1.5,
                    ).apply(player);
                },
            ),
        },
    ],
};
