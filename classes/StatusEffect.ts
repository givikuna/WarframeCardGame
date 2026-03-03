import { Card } from "./Card";

import { StatusEffectType } from "../types/enums";

export class StatusEffect {
    private appliedTo: Card;
    private appliedBy: Card;

    private statusEffectType: StatusEffectType;

    private duration: number;

    public constructor(appliedTo: Card, appliedBy: Card, statusEffectType: StatusEffectType, duration: number) {
        this.appliedTo = appliedTo;
        this.appliedBy = appliedBy;

        this.statusEffectType = statusEffectType;

        this.duration = duration;
    }

    // -- // --

    public getAppliedTo(): Card {
        return this.appliedTo;
    }

    public getAppliedBy(): Card {
        return this.appliedBy;
    }

    public getType(): StatusEffectType {
        return this.statusEffectType;
    }

    public getDuration(): number {
        return this.duration;
    }

    // -- // --

    public tick(): void {
        this.duration--;
        switch (this.statusEffectType) {
            case StatusEffectType.Impact:
                break;
            case StatusEffectType.Puncture:
                break;
            case StatusEffectType.Slash:
            //
            default:
                break;
        }
    }

    // -- // --
}
