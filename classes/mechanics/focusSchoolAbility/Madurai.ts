import { EventManager } from "../../../game/events/EventManager";
import { GameEventPayload } from "../../../interfaces/GameEventPayload";
import { FocusSchool } from "../../../types/enums";
import { EventHandler } from "../../../types/types";
import { IFocusSchoolAbility } from "../IFocusSchoolAbility";

export class Madurai implements IFocusSchoolAbility {
    public static register(em: EventManager) {
        let turns: number = 2;
        em.subscribe("FOCUS_ABILITY_ACTIVATED", (payload: GameEventPayload["FOCUS_ABILITY_ACTIVATED"]) => {
            if (payload.focusSchool !== FocusSchool.Madurai) {
                return;
            }

            payload.player.setTotalDamageMultiplier(1.3);

            const turnListener: EventHandler<GameEventPayload["TURN_STARTED"]> = (
                _pl: GameEventPayload["TURN_STARTED"],
            ): void => {
                turns--;
                if (turns === -1) {
                    turns = 2;
                    payload.player.setTotalDamageMultiplier(1);
                    em.unsubscribe("TURN_STARTED", turnListener);
                }
            };

            em.subscribe("TURN_STARTED", turnListener);
        });
    }
}
