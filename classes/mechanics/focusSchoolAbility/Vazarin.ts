import { GameEventPayload } from "../../../interfaces/GameEventPayload";
import { FocusSchool } from "../../../types/enums";
import { Card } from "../../Card";

import { EventManager } from "../../../game/events/EventManager";

import { IFocusSchoolAbility } from "../IFocusSchoolAbility";

export class Vazarin implements IFocusSchoolAbility {
    public static register(em: EventManager): void {
        em.subscribe("FOCUS_ABILITY_ACTIVATED", (payload: GameEventPayload["FOCUS_ABILITY_ACTIVATED"]) => {
            if (payload.focusSchool !== FocusSchool.Vazarin) {
                return;
            }

            payload.player.getCards().forEach((card: Card) => {
                card.heal(100);
                card.giveOverguard(50);
            });
        });
    }
}
