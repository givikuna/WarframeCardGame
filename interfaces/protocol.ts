import { DamageDistributionTable } from "../types/types";
import { DamageTaken } from "./DamageTaken";

export interface CardDTO {
    name: string;
    uid: string;

    maxHealth: number;
    maxShields: number;
    overguard: number;

    healthClass: string;
}

export interface DamageInstanceDTO extends DamageTaken {
    ddd: DamageDistributionTable;
    statusChance: number;
    criticalChance: number;
    criticalDamageMultiplier: number;
}
