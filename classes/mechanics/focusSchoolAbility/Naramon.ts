import { EventManager } from "../../../game/events/EventManager";
import { GameEventPayload } from "../../../interfaces/GameEventPayload";
import { FocusSchool } from "../../../types/enums";
import { Board } from "../../Board";
import { Card } from "../../Card";
import { IFocusSchoolAbility } from "../IFocusSchoolAbility";

export class Naramon implements IFocusSchoolAbility {
    public static register(em: EventManager, board: Board): void {
        em.subscribe("FOCUS_ABILITY_ACTIVATED", (payload: GameEventPayload["FOCUS_ABILITY_ACTIVATED"]) => {
            if (payload.focusSchool !== FocusSchool.Naramon) {
                return;
            }

            payload.player.getCards().forEach((c: Card): void => c.applyStatusEffect());
        });
    }
}
