import {
    DamageType,
    FactionSyndicate,
    HealthClass,
    Rarity,
    StatusEffectType,
    SyndicateEffect,
} from "../types/enums";

export const HealthClassDamageMultipliers: Record<
    HealthClass,
    ReadonlyArray<Readonly<[DamageType, 1.5 | 0.5]>>
> = {
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
    [StatusEffectType.Impact]: 5,
    [StatusEffectType.Puncture]: 3,
    [StatusEffectType.Slash]: 2,
    [StatusEffectType.Cold]: 4,
    [StatusEffectType.Electricity]: 2,
    [StatusEffectType.Heat]: 3,
    [StatusEffectType.Toxin]: 2,
    [StatusEffectType.Blast]: 5,
    [StatusEffectType.Corrosive]: 3,
    [StatusEffectType.Gas]: 2,
    [StatusEffectType.Magnetic]: 3,
    [StatusEffectType.Radiation]: 2,
    [StatusEffectType.Viral]: 3,
    [StatusEffectType.Void]: 2,
    [StatusEffectType.Tau]: 2,

    [StatusEffectType.Welled]: Infinity,
    [StatusEffectType.Magnetized]: 5,
    [StatusEffectType.MindControlled]: Infinity,
    [StatusEffectType.Spores]: 2,
    [StatusEffectType.Inked]: 10,
    [StatusEffectType.Roaring]: 5,
    [StatusEffectType.Crystallized]: 3,
    [StatusEffectType.Webbed]: 3,
    [StatusEffectType.Terrified]: 3,
    [StatusEffectType.Lantern]: 5,
    [StatusEffectType.Haste]: 2,

    [StatusEffectType.Flying]: Infinity,
    [StatusEffectType.Invisible]: Infinity,
    [StatusEffectType.Invincible]: Infinity,
    [StatusEffectType.Taunting]: Infinity,
    [StatusEffectType.Disabled]: Infinity,
    [StatusEffectType.Blinded]: Infinity,
    [StatusEffectType.Disarmed]: 3,
    [StatusEffectType.Impaired]: 3,
    [StatusEffectType.Lifted]: 2,
    [StatusEffectType.Immune]: Infinity,
};

export const CreditCostPerRarity: Record<Rarity, number> = {
    [Rarity.Free]: 0,
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

export const FactionSyndicateToEffect: Record<FactionSyndicate, SyndicateEffect> = {
    [FactionSyndicate.ArbitersOfHexis]: SyndicateEffect.Truth,
    [FactionSyndicate.SteelMeridian]: SyndicateEffect.Justice,
    [FactionSyndicate.CephalonSuda]: SyndicateEffect.Entropy,
    [FactionSyndicate.ThePerrinSequence]: SyndicateEffect.Sequence,
    [FactionSyndicate.RedVeil]: SyndicateEffect.Blight,
    [FactionSyndicate.NewLoka]: SyndicateEffect.Purity,
};

export const DamageTypePerSyndicateEffect: Record<SyndicateEffect, DamageType> = {
    [SyndicateEffect.Truth]: DamageType.Gas,
    [SyndicateEffect.Justice]: DamageType.Blast,
    [SyndicateEffect.Entropy]: DamageType.Magnetic,
    [SyndicateEffect.Sequence]: DamageType.Radiation,
    [SyndicateEffect.Blight]: DamageType.Viral,
    [SyndicateEffect.Purity]: DamageType.Corrosive,
};
