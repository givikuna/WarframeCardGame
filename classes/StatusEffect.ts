import { StatusEffectType } from "../types/types";
import { Card } from "./Card";
import { DamageInstance } from "./DamageInstance";

export class StatusEffect {
    protected appliedBy: Card;
    protected appliedTo: Card;
    protected damageInstance: DamageInstance;
    protected procType: StatusEffectType;
    protected dot: boolean;

    public constructor(
        appliedBy: Card,
        appliedTo: Card,
        damageInstance: DamageInstance,
        procType: StatusEffectType,
    ) {
        this.appliedBy = appliedBy;
        this.appliedTo = appliedTo;
        this.damageInstance = damageInstance;
        this.procType = procType;
        this.dot = ["Slash", "Electricity", "Heat", "Toxin", "Gas"].includes(this.procType);
    }

    public onTurn(): void {
        const di: DamageInstance = new DamageInstance(
            this.damageInstance.getFinalDamage(),
            {},
            0,
            0,
            1,
            this.appliedTo,
            this.appliedBy,
        );
    }

    public getAppliedBy(): Card {
        return this.appliedBy;
    }

    public getAppliedTo(): Card {
        return this.appliedTo;
    }

    public getDamageInstance(): DamageInstance {
        return this.damageInstance;
    }

    public getProcType(): StatusEffectType {
        return this.procType;
    }

    public isDot(): boolean {
        return this.dot;
    }
}
