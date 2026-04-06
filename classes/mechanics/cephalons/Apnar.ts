import { EventManager } from "../../../game/events/EventManager";

import { Board } from "../../Board";
import { DamageInstance } from "../../DamageInstance";

import { ICephalonMechanic } from "../ICephalonMechanic";

import { GameEventPayload } from "../../../interfaces/GameEventPayload";

import { togglePlayerNumber } from "../../../modules/togglePlayerNumber";

export class Apnar implements ICephalonMechanic {
    public static register(em: EventManager, board: Board, ownerPlayerNumber: 1 | 2): void {
        em.subscribe("CARD_DIED", (_payload: GameEventPayload["CARD_DIED"]): void =>
            DamageInstance.init(
                board[`getPlayer${togglePlayerNumber(ownerPlayerNumber)}`]().getOperator(),
                Apnar,
                { True: 35 },
                0,
                0,
                0,
            ).apply(board[`getPlayer${ownerPlayerNumber}`](), board),
        );
    }
}
