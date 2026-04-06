import { Board } from "../../Board";
import { Player } from "../../Player";
import { Card } from "../../Card";
import { DamageInstance } from "../../DamageInstance";

import { EventManager } from "../../../game/events/EventManager";

import { GameEventPayload } from "../../../interfaces/GameEventPayload";

import { IFactionSyndicateEffectMechanic } from "../IFactionSyndicateEffectMechanic";

import { togglePlayerNumber } from "../../../modules/togglePlayerNumber";

import { FactionSyndicate, SyndicateEffect } from "../../../types/enums";

import { DamageTypePerSyndicateEffect } from "../../../constants/constants";

export class Justice implements IFactionSyndicateEffectMechanic {
    public static register(em: EventManager, board: Board, ownerPlayerNumber: 1 | 2): void {
        em.subscribe("SYNDICATE_METER_FILLED", (payload: GameEventPayload["SYNDICATE_METER_FILLED"]): void => {
            if (payload.player.getPlayerNumber() !== ownerPlayerNumber) return;

            const owner: Player = board[`getPlayer${ownerPlayerNumber}`]();
            const enemy: Player = board[`getPlayer${togglePlayerNumber(ownerPlayerNumber)}`]();

            enemy.getCards().forEach((card: Card): void => {
                DamageInstance.init(
                    card,
                    this,
                    { [DamageTypePerSyndicateEffect[SyndicateEffect.Justice]]: 50 },
                    100,
                    0,
                    1,
                ).apply(owner, board);
            });

            enemy.getOperator().takeDamage(50, DamageTypePerSyndicateEffect[SyndicateEffect.Justice]);

            owner.getCards().forEach((card: Card): void => card.heal(Math.floor(card.getMaxHealth() * 0.25)));
        });
    }

    public static getFaction(): FactionSyndicate {
        return FactionSyndicate.SteelMeridian;
    }
}
