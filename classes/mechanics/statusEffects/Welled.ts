import { EventManager } from "../../../game/events/EventManager";
import { GameEventPayload } from "../../../interfaces/GameEventPayload";
import { Card } from "../../Card";

export class Welled {
    public static apply(em: EventManager, afflictedCard: Card): void {
        const deathListener = (payload: GameEventPayload["CARD_DIED"]) => {
            if (payload.card.getOwner() !== afflictedCard.getOwner()) {
                afflictedCard.takeDamage(99999, 99999, 99999);

                em.unsubscribe("CARD_DIED", deathListener);
            }
        };

        em.subscribe("CARD_DIED", deathListener);
    }
}
