import { Card } from "../classes/Card";
import { StatusEffect } from "../classes/StatusEffect";
import { Effect } from "../interfaces/Effect";
import { StatusEffectType } from "../types/enums";
import { StatusEffectDurationTable } from "../constants/constants";

import { STATUS_EFFECT_MAP } from "../constants/classConstants";

export class StatusEffectFactory {
    public static manufacture(
        to: Card,
        by: Card | Effect,
        SEType: StatusEffectType,
        duration?: number,
    ): StatusEffect {
        return new (STATUS_EFFECT_MAP[SEType] ?? StatusEffect)(
            to,
            by,
            duration ?? StatusEffectDurationTable[SEType],
        );
    }
}
