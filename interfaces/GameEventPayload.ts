import { Player } from "../classes/Player";
import { Operator } from "../classes/Operator";
import { Card } from "../classes/Card";

import { ICephalonMechanic } from "../classes/mechanics/ICephalonMechanic";

import { Effect } from "./Effect";
import { DamageTaken } from "./DamageTaken";

import { FactionSyndicate, FocusSchool } from "../types/enums";

export interface GameEventPayload {
    GAME_STARTED: { gameID: string };
    TURN_STARTED: { turnNumber: number; priorityPlayer: 1 | 2 };

    CARD_PLAYED: { player: Player; card: Card };
    CARD_DIED: { player: Player; card: Card };

    BEFORE_CARD_ACTS: { player: Player; card: Card; actionToTake: number };

    BEFORE_DAMAGE_DEALT: {
        source: Card | Effect | ICephalonMechanic;
        target: Card | Operator;
    };

    DAMAGE_DEALT: {
        source: Card | Effect | ICephalonMechanic;
        target: Card | Operator;
        damage: DamageTaken;
    };

    SYNDICATE_METER_FILLED: { player: Player; factionSyndicate: FactionSyndicate };
    FOCUS_ABILITY_ACTIVATED: { player: Player; focusSchool: FocusSchool };
}
