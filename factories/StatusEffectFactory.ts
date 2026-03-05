import { Card } from "../classes/Card";
import { StatusEffect } from "../classes/StatusEffect";

import { StatusEffectType } from "../types/enums";

import { StatusEffectDurationTable } from "../constants/constants";

export class StatusEffectFactory {
    public static manufacture(to: Card, by: Card, SEType: StatusEffectType): StatusEffect {
        return new StatusEffect(to, by, SEType, StatusEffectDurationTable[SEType]);
    }
}
