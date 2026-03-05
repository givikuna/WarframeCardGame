import { Board } from "../classes/Board";
import { Player } from "../classes/Player";
import { Action } from "../classes/Action";

import { ActionType } from "./enums";

export type ActionFunction = (player: Player, board: Board, actionType: ActionType) => void;

export type CardActionData = { onPlay: Action; onTurn: Action };

export type DamageDistributionTable = {
    Impact?: number;
    Puncture?: number;
    Slash?: number;
    Cold?: number;
    Electricity?: number;
    Heat?: number;
    Toxin?: number;
    Blast?: number;
    Corrosive?: number;
    Gas?: number;
    Magnetic?: number;
    Radiation?: number;
    Viral?: number;
    Void?: number;
    Tau?: number;
    True?: number;
};
