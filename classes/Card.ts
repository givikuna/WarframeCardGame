import { StatusEffect } from "./StatusEffect";

import { CardDTO } from "../interfaces/protocol";

import { CardActionData } from "../types/types";
import { HealthClass } from "../types/enums";

export class Card {
    private name: string;
    private uid: string;
    private iid: string;

    private maxHealth: number;
    private maxShields: number;

    private currentHealth: number;
    private currentShields: number;

    private overguard: number;

    private healthClass: HealthClass;

    private actions: CardActionData;

    private statusEffects: StatusEffect[] = [];

    public constructor(card: CardDTO, cad: CardActionData, iid: string) {
        this.iid = iid;

        this.actions = cad;

        [this.name, this.uid, this.maxHealth, this.maxShields, this.maxHealth, this.maxShields] = Object.keys(card)
            .filter((s: string): boolean => s != "overguard")
            .map((key: string): any => card[key]);

        this.currentHealth = this.maxHealth;
        this.currentShields = this.maxShields;

        this.overguard = card.overguard;

        this.healthClass = HealthClass[card.healthClass];
    }

    public getName(): string {
        return this.name;
    }

    public getUID(): string {
        return this.uid;
    }

    public getIID(): string {
        return this.iid;
    }

    public getMaxHealth(): number {
        return this.maxHealth;
    }

    public getMaxShields(): number {
        return this.maxShields;
    }

    public getCurrentHealth(): number {
        return this.currentHealth;
    }

    public getCurrentShields(): number {
        return this.currentShields;
    }

    public getOverguard(): number {
        return this.overguard;
    }

    public getHealthClass(): HealthClass {
        return this.healthClass;
    }

    public getActions(): CardActionData {
        return this.actions;
    }

    public getStatusEffects(): ReadonlyArray<StatusEffect> {
        return this.statusEffects;
    }

    // -- // --
}
