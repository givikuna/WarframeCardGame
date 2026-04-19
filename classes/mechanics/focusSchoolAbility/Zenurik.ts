import { Card } from "../../Card";

import { EventManager } from "../../../game/events/EventManager";

import { GameEventPayload } from "../../../interfaces/GameEventPayload";
import { IFocusSchoolAbility } from "../IFocusSchoolAbility";

import { FocusSchool } from "../../../types/enums";

export class Zenurik implements IFocusSchoolAbility {
    public static register(em: EventManager): void {
        em.subscribe("FOCUS_ABILITY_ACTIVATED", (payload: GameEventPayload["FOCUS_ABILITY_ACTIVATED"]) => {
            if (payload.focusSchool !== FocusSchool.Zenurik) {
                return;
            }

            const cards: ReadonlyArray<Card> = payload.player.getCards();

            if (cards.length === 0) {
                return;
            }

            const highestHealthCard: Card = cards.reduce((prev: Card, current: Card) => {
                return prev.getMaxHealth() > current.getMaxHealth() ? prev : current;
            });

            payload.player.giveCredits(highestHealthCard.getMaxHealth());
            highestHealthCard.kill();
        });
    }
}
