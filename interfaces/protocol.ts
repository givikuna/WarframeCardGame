import { DamageTaken } from "./DamageTaken";

import { DamageDistributionTable } from "../types/types";

export interface CardDTO {
    name: string;
    uid: string;

    maxHealth: number;
    maxShields: number;
    overguard: number;
}

export interface DamageInstanceDTO extends DamageTaken {
    ddd: DamageDistributionTable;
    statusChance: number;
    criticalChance: number;
    criticalDamageMultiplier: number;
}
