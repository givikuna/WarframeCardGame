import { AbilityFunction, StatusEffectType } from "../types/types";
import { Ability } from "./Ability";
import { StatusEffect } from "./StatusEffect";

export class Card {
    protected health: number;
    protected shield: number;
    protected armor: number;
    protected currentEnergy: number;
    public readonly maxEnergy: number;
    public readonly startingEnergy: number;
    protected abilities: Ability[];
    protected statusEffects: { [s: string]: StatusEffect[] };
    protected passive: AbilityFunction;

    public constructor(
        health: number,
        shield: number,
        armor: number,
        maxEnergy: number,
        startingEnergy: number,
        abilities: Ability[],
        passive: AbilityFunction,
    ) {
        this.health = health;
        this.shield = shield;
        this.armor = armor;
        this.maxEnergy = maxEnergy;
        this.startingEnergy = startingEnergy;
        this.currentEnergy = startingEnergy;
        this.abilities = abilities;
        this.statusEffects = {};
        this.passive = passive;
    }

    public getHealth(): number {
        return this.health;
    }

    public getShield(): number {
        return this.shield;
    }

    public getArmor(): number {
        return this.armor;
    }

    public getCurrentEnergy(): number {
        return this.currentEnergy;
    }

    public getAbilities(): Ability[] {
        return this.abilities;
    }

    public getStatusEffects(): { [s: string]: StatusEffect[] } {
        return this.statusEffects;
    }

    public getPassive(): AbilityFunction {
        return this.passive;
    }

    public addStatusEffect(type: StatusEffectType, proc: StatusEffect): void {
        this.statusEffects[type].push(proc);
    }

    public onTurn(): void {
        const effects: StatusEffectType[] = Object.keys(this.statusEffects) as StatusEffectType[];
        for (let i: number = 0; i < effects.length; i++) {
            for (let j: number = this.statusEffects[effects[i]].length - 1; j >= 0; j--) {
                this.statusEffects[effects[i]][j].nextTurn();
                if (this.statusEffects[effects[i]][j].getDuration() <= 0) {
                    this.statusEffects[effects[i]].splice(j, 1);
                }
            }
        }
    }

    public gainShield(amount: number): void {
        this.shield += amount;
    }

    public gainHealth(amount: number): void {
        this.health += amount;
    }

    public gainEnergy(amount: number): void {
        this.currentEnergy = Math.min(this.currentEnergy + amount, this.maxEnergy);
    }
}
