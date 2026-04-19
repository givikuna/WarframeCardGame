import { StatusEffectFactory } from "../../../factories/StatusEffectFactory";
import { EventManager } from "../../../game/events/EventManager";
import { GameEventPayload } from "../../../interfaces/GameEventPayload";
import { FocusSchool, StatusEffectType } from "../../../types/enums";
import { Card } from "../../Card";
import { IFocusSchoolAbility } from "../IFocusSchoolAbility";

export class Naramon implements IFocusSchoolAbility {
    public static register(em: EventManager): void {
        em.subscribe("FOCUS_ABILITY_ACTIVATED", (payload: GameEventPayload["FOCUS_ABILITY_ACTIVATED"]) => {
            if (payload.focusSchool !== FocusSchool.Naramon) {
                return;
            }

            payload.player
                .getCards()
                .forEach((c: Card): void =>
                    c.applyStatusEffect(StatusEffectFactory.manufacture(c, this, StatusEffectType.Haste)),
                );
        });
    }
}
