import { Card } from "../classes/Card";
import { StatusEffect } from "../classes/StatusEffect";

import { Effect } from "../interfaces/Effect";

import { StatusEffectType } from "../types/enums";

import { StatusEffectDurationTable } from "../constants/constants";

export class StatusEffectFactory {
    public static manufacture(
        to: Card,
        by: Card | Effect,
        SEType: StatusEffectType,
        duration?: number,
    ): StatusEffect {
        return new StatusEffect(to, by, SEType, duration ?? StatusEffectDurationTable[SEType]);
    }
}
