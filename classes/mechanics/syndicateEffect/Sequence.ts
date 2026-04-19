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

export class Sequence implements IFactionSyndicateEffectMechanic {
    public static register(em: EventManager, board: Board, ownerPlayerNumber: 1 | 2): void {
        em.subscribe("SYNDICATE_METER_FILLED", (payload: GameEventPayload["SYNDICATE_METER_FILLED"]): void => {
            if (payload.player.getPlayerNumber() !== ownerPlayerNumber) return;

            const owner: Player = board[`getPlayer${ownerPlayerNumber}`]();
            const enemy: Player = board[`getPlayer${togglePlayerNumber(ownerPlayerNumber)}`]();

            enemy.getCards().forEach((card: Card): void => {
                DamageInstance.init(
                    card,
                    this,
                    { [DamageTypePerSyndicateEffect[SyndicateEffect.Sequence]]: 50 },
                    100,
                    0,
                    1,
                ).apply(owner, board);
            });

            enemy.getOperator().takeDamage(50, DamageTypePerSyndicateEffect[SyndicateEffect.Sequence]);

            owner.getCards().forEach((card: Card): void => card.giveShield(card.getMaxShields() * 0.25));
        });
    }

    public static getFaction(): FactionSyndicate {
        return FactionSyndicate.ThePerrinSequence;
    }
}
