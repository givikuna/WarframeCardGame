import { Player } from "../classes/Player";
import { Operator } from "../classes/Operator";
import { Card } from "../classes/Card";

import { Effect } from "./Effect";

import { FactionSyndicate, FocusSchool } from "../types/enums";

export interface GameEventPayload {
    GAME_STARTED: { gameID: string };
    TURN_STARTED: { turnNumber: number; priorityPlayer: 1 | 2 };

    CARD_PLAYED: { player: Player; card: Card };
    CARD_DIED: { player: Player; card: Card };

    DAMAGE_DEALT: {
        source: Card | Effect;
        target: Card | Operator;
    };

    SYNDICATE_METER_FILLED: { player: Player; factionSyndicate: FactionSyndicate };
    FOCUS_ABILITY_ACTIVATED: { player: Player; focusSchool: FocusSchool };
}
