import { Card } from "../classes/Card";
import { Board } from "../classes/Board";
import { StatusEffect } from "../classes/StatusEffect";

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
    Disabled: number;
    Invisible: number;
    Blinded: number;
    Invincible: number;
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

export type ProcTable = {
    Impact?: StatusEffect[];
    Disable?: StatusEffect[];
    Puncture?: StatusEffect[];
    Slash?: StatusEffect[];
    Cold?: StatusEffect[];
    Electricity?: StatusEffect[];
    Heat?: StatusEffect[];
    Toxin?: StatusEffect[];
    Blast?: StatusEffect[];
    Flying?: StatusEffect[];
    Corrosive?: StatusEffect[];
    Gas?: StatusEffect[];
    Magnetic?: StatusEffect[];
    Radiation?: StatusEffect[];
    Viral?: StatusEffect[];
    Void?: StatusEffect[];
    Tau?: StatusEffect[];
    Disarmed?: StatusEffect[];
    Invisible?: StatusEffect[];
    Invincible?: StatusEffect[];
    Blinded?: StatusEffect[];
};

export type AbilityFunction = (
    board: Board,
    currentLocation: number,
    chosenCards: Card[],
    variable: number,
    applicant: Card,
) => boolean;

export type Nullable<T> = T | null;

export type Faction =
    | "Tenno"
    | "Grineer"
    | "Kuva Grineer"
    | "Corpus"
    | "Corpus Amalgam"
    | "Infested"
    | "Infested Deimos"
    | "Orokin"
    | "Sentient"
    | "Narmer"
    | "The Murmur"
    | "Zariman"
    | "Scaldra"
    | "Techrot"
    | "Duviri"
    | "Stalker"
    | "Object"
    | "Unaffiliated";

export type Affiliation =
    | "Steel Meridian"
    | "Arbiters of Hexis"
    | "Cephalon Suda"
    | "The Perrin Sequence"
    | "Red Veil"
    | "New Loka"
    | "Conclave"
    | "Cephalon Simaris"
    | "Ostron"
    | "The Quills"
    | "Solaris United"
    | "Vox Solaris"
    | "Ventkids"
    | "Entrati"
    | "Necraloid"
    | "Kahl's Garrison"
    | "The Holdfasts"
    | "Cavia"
    | "The Hex"
    | "Nightcap"
    | "Acolyte"
    | "Deimos Infested Beast"
    | "Warframe"
    | "Operator";

export type AttackType = "Melee" | "Ranged" | "Explosive" | "DoT";

export type WeaponSlot = "Primary" | "Secondary" | "Melee";

export type Resource = "Energy" | "Shields" | "Cooldown" | "Health";
