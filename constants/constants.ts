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
