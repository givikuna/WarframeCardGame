import { Board } from "../classes/Board";
import { Player } from "../classes/Player";
import { Card } from "../classes/Card";
import { Action } from "../classes/Action";

import { ActionType } from "./enums";

export type Nullable<T> = T | null;

export type TargetingFunction = (card?: Card, player?: Player, board?: Board) => Card | undefined;

export type ActionFunction = (
    targetingFunction: TargetingFunction,
    card: Card,
    player: Player,
    board: Board,
    actionType: ActionType,
) => void;

export type CardActionData = { action: Action };

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
