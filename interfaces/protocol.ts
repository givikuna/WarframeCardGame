export interface CardDTO {
    name: string;
    uid: string;

    maxHealth: number;
    maxShields: number;
    overguard: number;

    healthClass: string;
}

export interface DamageInstanceDTO {
    uid: string;
}
