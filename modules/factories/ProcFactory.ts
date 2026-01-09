import { Card } from "../../classes/Card";
import { DamageInstance } from "../../classes/DamageInstance";
import { StatusEffect } from "../../classes/StatusEffect";

import { DamageDistributionDictionary, StatusEffectType } from "../../types/types";

import { DoTCritChanceTable, ProcDurationTable, DoTMultiplicationTable } from "../../constants/constants";

import { isDoT } from "../helpers/isDoT";

export class ProcFactory {
    public static manufacture(
        name: StatusEffectType,
        inflicter: Card,
        inflicted: Card,
        di?: DamageInstance | number,
        givenDuration?: number,
    ): StatusEffect {
        const dd: DamageDistributionDictionary = {};

        if (isDoT(name)) {
            (dd as any)[name] = Math.ceil(
                (typeof di == "number"
                    ? di
                    : di instanceof DamageInstance
                    ? ((di.getDDD() as any)[name] as number)
                    : 75) * DoTMultiplicationTable[name],
            );
        }

        return new StatusEffect(
            name,
            givenDuration ?? ProcDurationTable[name],
            inflicted,
            inflicter,
            di,
            (): DamageInstance =>
                new DamageInstance(
                    dd,
                    DoTCritChanceTable[name],
                    1.6,
                    name == "Electricity" ? 5 : 0,
                    inflicter,
                    inflicted,
                    "DoT",
                ),
        );
    }
}
