import { Card } from "../classes/Card";
import { Board } from "../classes/Board";
import { StatusEffect } from "../classes/StatusEffect";
import { Ability } from "../classes/Ability";

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
    | "Disabled"
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
    Disabled?: StatusEffect[];
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
) => void;

export type Nullable<T> = T | null;

export type AttackType = "Melee" | "Ranged" | "Explosive" | "DoT";

export type WeaponSlot = "Primary" | "Secondary" | "Melee";

export type Resource = "Energy" | "Shields" | "Cooldown" | "Health";

export type HealthType =
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
    | "Object"
    | "Stalker"
    | "Wild";

export type Faction =
    | "Tenno"
    | "Grineer"
    | "Corpus"
    | "Infested"
    | "Orokin"
    | "Sentient"
    | "Stalker"
    | "Narmer"
    | "The Murmur"
    | "Scaldra"
    | "Techrot"
    | "Steel Meridian"
    | "Arbiters of Hexis"
    | "Cephalon Suda"
    | "The Perrin Sequence"
    | "Red Veil"
    | "New Loka"
    | "Duviri"
    | "Conclave"
    | "Cephalon Simaris"
    | "Ostron"
    | "The Quills"
    | "Solaris United"
    | "Ventkids"
    | "Vox Solaris"
    | "Entrati"
    | "Necraloid"
    | "The Hex"
    | "The Holdfasts"
    | "Cavia"
    | "Kahl's Garrison"
    | "Nightcap"
    | "Operational Supply"
    | "Nightwave"
    | "Unaffiliated";

export type DamageTable = { health: number; shield: number; overguard: number };

export type CardStats = {
    faction: Faction;
    healthType: HealthType;
    maxHealth: number;
    maxShields: number;
    baseArmor: number;
    maxOverguard: number;
    maxEnergy: number;
    startingEnergy: number;
};

export type CardData = { name: string } & CardStats & { abilities: ReadonlyArray<Ability> };
