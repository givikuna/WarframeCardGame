import { DamageType, HealthClass, Rarity, StatusEffectType } from "../types/enums";

export const HealthClassDamageMultipliers: Record<HealthClass, ReadonlyArray<Readonly<[DamageType, 1.5 | 0.5]>>> = {
    [HealthClass.Tenno]: [
        [DamageType.Tau, 1.5],
        [DamageType.Void, 0.5],
    ],
    [HealthClass.Grineer]: [
        [DamageType.Impact, 1.5],
        [DamageType.Corrosive, 1.5],
    ],
    [HealthClass.KuvaGrineer]: [
        [DamageType.Impact, 1.5],
        [DamageType.Corrosive, 1.5],
        [DamageType.Heat, 0.5],
    ],
    [HealthClass.Corpus]: [
        [DamageType.Puncture, 1.5],
        [DamageType.Magnetic, 1.5],
    ],
    [HealthClass.CorpusAmalgam]: [
        [DamageType.Magnetic, 1.5],
        [DamageType.Electricity, 1.5],
        [DamageType.Blast, 0.5],
    ],
    [HealthClass.Infested]: [
        [DamageType.Slash, 1.5],
        [DamageType.Heat, 1.5],
    ],
    [HealthClass.InfestedDeimos]: [
        [DamageType.Blast, 1.5],
        [DamageType.Gas, 1.5],
    ],
    [HealthClass.Orokin]: [
        [DamageType.Puncture, 1.5],
        [DamageType.Viral, 1.5],
        [DamageType.Radiation, 0.5],
    ],
    [HealthClass.Sentient]: [
        [DamageType.Cold, 1.5],
        [DamageType.Radiation, 1.5],
        [DamageType.Corrosive, 1.5],
    ],
    [HealthClass.Narmer]: [
        [DamageType.Slash, 1.5],
        [DamageType.Toxin, 1.5],
        [DamageType.Magnetic, 0.5],
    ],
    [HealthClass.Zariman]: [
        [DamageType.Void, 1.5],
        [DamageType.Magnetic, 0.5],
    ],
    [HealthClass.TheMurmur]: [
        [DamageType.Electricity, 1.5],
        [DamageType.Radiation, 1.5],
        [DamageType.Viral, 0.5],
    ],
    [HealthClass.Techrot]: [
        [DamageType.Gas, 1.5],
        [DamageType.Magnetic, 1.5],
        [DamageType.Cold, 0.5],
    ],
    [HealthClass.Scaldra]: [
        [DamageType.Impact, 1.5],
        [DamageType.Corrosive, 1.5],
        [DamageType.Gas, 0.5],
    ],
    [HealthClass.Stalker]: [[DamageType.Void, 0.5]],
    [HealthClass.Anarchs]: [
        [DamageType.Impact, 1.5],
        [DamageType.Electricity, 1.5],
        [DamageType.Radiation, 0.5],
    ],
    [HealthClass.Ostron]: [],
    [HealthClass.Wild]: [],
    [HealthClass.Object]: [],
};

export const StatusEffectDurationTable: Record<StatusEffectType, number> = {
    [StatusEffectType.Impact]: 0,
    [StatusEffectType.Puncture]: 0,
    [StatusEffectType.Slash]: 0,
    [StatusEffectType.Cold]: 0,
    [StatusEffectType.Electricity]: 0,
    [StatusEffectType.Heat]: 0,
    [StatusEffectType.Toxin]: 0,
    [StatusEffectType.Blast]: 0,
    [StatusEffectType.Corrosive]: 0,
    [StatusEffectType.Gas]: 0,
    [StatusEffectType.Magnetic]: 0,
    [StatusEffectType.Radiation]: 0,
    [StatusEffectType.Viral]: 0,
    [StatusEffectType.Void]: 0,
    [StatusEffectType.Tau]: 0,
    [StatusEffectType.Flying]: 0,
    [StatusEffectType.Invisible]: 0,
    [StatusEffectType.Invincible]: 0,
    [StatusEffectType.Taunting]: 0,
    [StatusEffectType.Blinded]: 0,
};

export const CreditCostPerRarity: Record<Rarity, number> = {
    [Rarity.Common]: 100,
    [Rarity.Uncommon]: 200,
    [Rarity.Rare]: 400,
    [Rarity.Legendary]: 800,
    [Rarity.Riven]: 1200,
    [Rarity.Galvanized]: 1800,
    [Rarity.Requiem]: 2500,
    [Rarity.Archon]: 3500,
    [Rarity.Tome]: 5000,
};
