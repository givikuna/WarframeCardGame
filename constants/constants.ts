import { DamageType, StatusEffectType, Faction } from "../types/types";

export const damageTypeToStatus: { [damageType: string]: StatusEffectType } = {
    Impact: "Impact",
    Puncture: "Puncture",
    Slash: "Slash",
    Cold: "Cold",
    Electricity: "Electricity",
    Heat: "Heat",
    Toxin: "Toxin",
    Blast: "Blast",
    Corrosive: "Corrosive",
    Gas: "Gas",
    Magnetic: "Magnetic",
    Radiation: "Radiation",
    Viral: "Viral",
    Void: "Void",
    Tau: "Tau",
};

export const damageTypes: DamageType[] = [
    "Impact",
    "Puncture",
    "Slash",
    "Cold",
    "Electricity",
    "Heat",
    "Toxin",
    "Blast",
    "Corrosive",
    "Gas",
    "Magnetic",
    "Radiation",
    "Viral",
    "Void",
    "Tau",
    "True",
];

export const FactionDamageMultipliers: {
    [faction: string]: [DamageType, 1.5 | 0.5][];
} = {
    Tenno: [],
    Grineer: [
        ["Impact", 1.5],
        ["Corrosive", 1.5],
    ],
    "Kuva Grineer": [
        ["Impact", 1.5],
        ["Corrosive", 1.5],
        ["Heat", 0.5],
    ],
    Corpus: [
        ["Puncture", 1.5],
        ["Magnetic", 1.5],
    ],
    "Corpus Amalgam": [
        ["Electricity", 1.5],
        ["Magnetic", 1.5],
        ["Blast", 0.5],
    ],
    Infested: [
        ["Slash", 1.5],
        ["Heat", 1.5],
    ],
    "Infested Deimos": [
        ["Blast", 1.5],
        ["Gas", 1.5],
    ],
    Orokin: [
        ["Puncture", 1.5],
        ["Viral", 1.5],
        ["Radiation", 0.5],
    ],
    Sentient: [
        ["Cold", 1.5],
        ["Radiation", 1.5],
        ["Corrosive", 0.5],
    ],
    Narmer: [
        ["Slash", 1.5],
        ["Toxin", 1.5],
        ["Magnetic", 0.5],
    ],
    "The Murmur": [
        ["Electricity", 1.5],
        ["Radiation", 1.5],
        ["Viral", 0.5],
    ],
    Zariman: [["Void", 1.5]],
    Scaldra: [
        ["Impact", 1.5],
        ["Corrosive", 1.5],
        ["Gas", 0.5],
    ],
    Techrot: [
        ["Gas", 1.5],
        ["Magnetic", 1.5],
        ["Cold", 0.5],
    ],
    Duviri: [["Void", 1.5]],
    Stalker: [],
    Object: [],
    Unaffiliated: [],
};

export const ProcDurationTable: { [s: string]: number } = {
    Impact: 3,
    Puncture: 3,
    Slash: 3,
    Cold: 5,
    Electricity: 2,
    Heat: 3,
    Toxin: 2,
    Blast: 2,
    Corrosive: 4,
    Gas: 2,
    Magnetic: 4,
    Radiation: 3,
    Viral: 2,
    Void: 3,
    Tau: 8,
    Flying: Number.POSITIVE_INFINITY,
    Disarmed: Number.POSITIVE_INFINITY,
    Disabled: Number.POSITIVE_INFINITY,
    Invisible: Number.POSITIVE_INFINITY,
    Invincible: Number.POSITIVE_INFINITY,
    Blinded: Number.POSITIVE_INFINITY,
};
