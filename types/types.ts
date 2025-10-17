import { Card } from "../classes/Card";
import { Board } from "../classes/Board";

export type DamageType =
    | "Impact"
    | "Puncture"
    | "Slash"
    | "Cold"
    | "Electricity"
    | "Heat"
    | "Toxin"
    | "Blast"
    | "Corrosive"
    | "Gas"
    | "Magnetic"
    | "Radiation"
    | "Viral"
    | "Void"
    | "Tau"
    | "True";

export type DamageDistributionDictionary = {
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
};

export type StatusEffectCount = {
    Impact: number;
    Puncture: number;
    Slash: number;
    Cold: number;
    Electricity: number;
    Heat: number;
    Toxin: number;
    Blast: number;
    Corrosive: number;
    Gas: number;
    Magnetic: number;
    Radiation: number;
    Viral: number;
    Void: number;
    Tau: number;
    Flying: number;
    Disarmed: number;
};

export type StatusEffectType =
    | "Impact"
    | "Disable"
    | "Puncture"
    | "Slash"
    | "Cold"
    | "Electricity"
    | "Heat"
    | "Toxin"
    | "Blast"
    | "Flying"
    | "Corrosive"
    | "Gas"
    | "Magnetic"
    | "Radiation"
    | "Viral"
    | "Void"
    | "Tau"
    | "Disarmed"
    | "Invisible"
    | "Invincible"
    | "Blinded";

export type AbilityFunction = (
    board: Board,
    currentLocation: number,
    chosenCards: Card[],
    variable: number,
    applicant: Card,
) => boolean;

export type Nullable<T> = T | null;
