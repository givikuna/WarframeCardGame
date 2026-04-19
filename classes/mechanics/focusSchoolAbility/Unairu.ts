import { EventManager } from "../../../game/events/EventManager";
import { GameEventPayload } from "../../../interfaces/GameEventPayload";
import { FocusSchool } from "../../../types/enums";
import { Board } from "../../Board";
import { Card } from "../../Card";
import { IFocusSchoolAbility } from "../IFocusSchoolAbility";
import { togglePlayerNumber } from "../../../modules/togglePlayerNumber";

export class Unairu implements IFocusSchoolAbility {
    public static register(em: EventManager, board: Board): void {
        em.subscribe("FOCUS_ABILITY_ACTIVATED", (payload: GameEventPayload["FOCUS_ABILITY_ACTIVATED"]) => {
            if (payload.focusSchool !== FocusSchool.Unairu) {
                return;
            }

            const enemyPlayer = board[`getPlayer${togglePlayerNumber(payload.player.getPlayerNumber())}`]();

            enemyPlayer.getCards().forEach((card: Card) => card.stripShields());
            enemyPlayer.getOperator().stripShields();
        });
    }
}
