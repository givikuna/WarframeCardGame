import { Board } from "../classes/Board";
import { Player } from "../classes/Player";
import { Operator } from "../classes/Operator";
import { Card } from "../classes/Card";
import { Action } from "../classes/Action";

import { GameEventPayload } from "../interfaces/GameEventPayload";

import { ActionType } from "./enums";

export type Nullable<T> = T | null;

export type TargetingFunction = (card: Card, player: Player, board: Board) => Card | Operator | undefined;

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

export type GameEventType = keyof GameEventPayload;
