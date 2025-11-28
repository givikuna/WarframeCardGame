import { Card } from "./Card";
import { DamageInstance } from "./DamageInstance";

import { StatusEffectType, Nullable } from "../types/types";

export class StatusEffect {
    protected name: StatusEffectType;
    protected di: Nullable<DamageInstance>;
    protected duration: number; // number of turns
    protected appliedTo: Card;
    protected appliedBy: Card;
    protected dot: boolean;

    public constructor(
        name: StatusEffectType,
        duration: number,
        at: Card,
        ab: Card,
        di?: DamageInstance,
    ) {
        this.name = name;
        this.duration = duration;
        this.appliedTo = at;
        this.appliedBy = ab;
        this.dot = ["Slash", "Electricity", "Heat", "Toxin", "Gas"].includes(this.name);
        if (!this.dot || di == null || di == undefined) {
            this.di = null;
        } else {
            this.di = di;
        }
    }

    public nextTurn(): void {
        this.duration--;
    }
}
