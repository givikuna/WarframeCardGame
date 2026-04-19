import { Card } from "../Card";
import { StatusEffect } from "../StatusEffect";
import { Effect } from "../../interfaces/Effect";
import { StatusEffectType } from "../../types/enums";

export class Flying extends StatusEffect {
    public constructor(appliedTo: Card, appliedBy: Card | Effect, duration: number) {
        super(appliedTo, appliedBy, StatusEffectType.Flying, duration);
    }
}
