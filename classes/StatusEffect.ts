import { Card } from "./Card";
import { DamageInstance } from "./DamageInstance";

import { StatusEffectType, Nullable } from "../types/types";

import { isDoT } from "../modules/isDoT";

export class StatusEffect {
    protected name: StatusEffectType;
    protected di: Nullable<DamageInstance> = null;
    protected DIexists: boolean = false;
    protected duration: number; // number of turns
    protected appliedTo: Card;
    protected appliedBy: Card;
    protected dot: boolean;
    protected dotDMGFormula: Nullable<() => DamageInstance> = null;
    protected direct: boolean = true;

    public constructor(
        name: StatusEffectType,
        duration: number,
        at: Card,
        ab: Card,
        di?: DamageInstance | number,
        dotDMGFormula?: () => DamageInstance,
    ) {
        this.name = name;
        this.duration = duration;
        this.appliedTo = at;
        this.appliedBy = ab;
        this.dot = isDoT(this.name);
        if (this.dot && (di == null || di == undefined)) {
            this.di = null;
            this.DIexists = false;
        }
        if (dotDMGFormula !== null && dotDMGFormula !== undefined) {
            this.dotDMGFormula = dotDMGFormula;
        }
    }

    public nextTurn(): this {
        this.duration--;
        if (this.dot) {
            this.appliedTo.applyDamage(this.dotDMGFormula!());
            console.log("dot");
        }
        return this;
    }

    public getDoT(): Nullable<DamageInstance> {
        return this.dotDMGFormula == null || this.dotDMGFormula == undefined
            ? null
            : this.dotDMGFormula();
    }

    public getProcType(): StatusEffectType {
        return this.name;
    }

    public getDuration(): number {
        return this.duration;
    }

    public getInflictor(): Card {
        return this.appliedBy;
    }

    public makeDirect(): this {
        this.direct = true;
        return this;
    }

    public makeIndirect(): this {
        this.direct = false;
        return this;
    }

    public isDirect(): boolean {
        return this.direct;
    }

    public getDI(): Nullable<DamageInstance | number> {
        return this.di;
    }
}
