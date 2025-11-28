import { DamageType, StatusEffectType } from "../types/types";

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
    [faction: string]: ReadonlyArray<Readonly<[DamageType, 1.5 | 0.5]>>;
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
    Stalker: [],
    Object: [],
    Wild: [],
};

export const ProcDurationTable: { [s: string]: number } = {
    Impact: 3,
    Puncture: 3,
    Slash: 2,
    Cold: 5,
    Electricity: 1,
    Heat: 2,
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

export const DoTProcs: ReadonlyArray<StatusEffectType> = [
    "Slash",
    "Electricity",
    "Heat",
    "Toxin",
    "Blast",
    "Gas",
];

export const DoTMultiplicationTable: { [proc: string]: number } = {
    Electricity: 0.5,
    Slash: 0.35,
    Heat: 0.5,
    Toxin: 0.3,
    Blast: 0.3,
    Gas: 0.5,
};

export const DoTCritChanceTable: { [proc: string]: number } = {
    Electricity: 5,
    Slash: 15,
    Heat: 10,
    Toxin: 5,
    Blast: 5,
    Gas: 2,
};
