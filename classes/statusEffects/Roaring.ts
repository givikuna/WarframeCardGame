import { Card } from "../Card";
import { StatusEffect } from "../StatusEffect";
import { Effect } from "../../interfaces/Effect";

import { StatusEffectType } from "../../types/enums";

export class Roaring extends StatusEffect {
    public constructor(appliedTo: Card, appliedBy: Card | Effect, duration: number) {
        super(appliedTo, appliedBy, StatusEffectType.Roaring, duration);
    }
}
