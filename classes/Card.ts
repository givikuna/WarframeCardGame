import { AbilityFunction, StatusEffectType } from "../types/types";
import { Ability } from "./Ability";
import { DamageInstance } from "./DamageInstance";
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

    protected chanceToFailCast: number;
    protected player: 0 | 1 | 2;

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
        this.chanceToFailCast = 0;
        this.player = 0;
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

    public setArmor(newArmor: number): void {
        this.armor = newArmor;
    }

    public setChanceToFailCast(n: number): void {
        this.chanceToFailCast = n;
    }

    public proc(proc: StatusEffect): void {
        this.statusEffects[proc.getProcType()].push(proc);
        if (this.statusEffects["Blast"].length >= 5) {
            let d: number = 0;
            for (let i: number = 0; i < this.statusEffects["Blast"].length; i++) {
                d += this.statusEffects["Blast"][i].getDamageInstance().getBaseDamage() / 5;
            }
            const di: DamageInstance = new DamageInstance(
                d,
                {},
                0,
                0,
                1,
                this,
                this.statusEffects["Blast"][0].getDamageInstance().getDealerCard(),
            );
            this.statusEffects["Blast"] = [];
        }
    }

    public onTurn(): void {
        //
    }

    public gainShield(amount: number): void {
        this.shield += amount;
        if (this.shield < 0) {
            this.shield = 0;
        }
    }

    public gainHealth(amount: number): void {
        this.health += amount;
    }

    public gainEnergy(amount: number): void {
        this.currentEnergy = Math.min(this.currentEnergy + amount, this.maxEnergy);
    }

    public damage(di: DamageInstance): void {
        if (this.getShield() > 0) {
            this.gainShield(-di.getFinalDamage());
            return;
        }

        for (let i: number = 0; i < di.getStatusEffects().length; i++) {
            this.proc(new StatusEffect(di.getDealerCard(), this, di, di.getStatusEffects()[i]));
        }

        this.gainHealth(-di.getFinalDamage());
    }

    public setPlayer(n: 0 | 1 | 2): void {
        this.player = n;
    }

    public getPlayer(): 0 | 1 | 2 {
        return this.player;
    }
}
