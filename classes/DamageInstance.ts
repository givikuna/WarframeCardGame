import * as Encodex from "@givi-tsvariani/encodex";

import { Card } from "./Card";
import { StatusEffect } from "./StatusEffect";

import {
    DamageDistributionDictionary,
    AttackType,
    DamageType,
    StatusEffectType,
} from "../types/types";

import {
    FactionDamageMultipliers,
    ProcDurationTable,
    damageTypeToStatus,
} from "../constants/constants";
import { armorDR } from "./modules/armorDR";

export class DamageInstance {
    protected damageDistribution: DamageDistributionDictionary;
    protected criticalChance: number;
    protected criticalDamageMultiplier: number;
    protected statusChance: number;
    protected attackerCard: Card;
    protected attackedCard: Card;
    protected attackType: AttackType;

    protected damage: { health: number; shield: number; overguard: number } = {
        health: 0,
        shield: 0,
        overguard: 0,
    };

    public constructor(
        dd: DamageDistributionDictionary,
        cc: number,
        cdm: number,
        sc: number,
        attackerCard: Card,
        attackedCard: Card,
        at: AttackType,
    ) {
        this.damageDistribution = dd;
        this.criticalChance = cc;
        this.criticalDamageMultiplier = cdm;
        this.statusChance = sc;
        this.attackedCard = attackedCard;
        this.attackerCard = attackerCard;
        this.attackType = at;
    }

    public getDDD(): DamageDistributionDictionary {
        return this.damageDistribution;
    }

    public hasDamageType(s: DamageType): boolean {
        return Object.keys(this.getDDD()).includes("s") && (this.getDDD as any)[s] > 0;
    }

    public calculateStatusEffects(): ReadonlyArray<StatusEffect> {
        const proc_count: number = Math.floor(
            Math.floor(this.statusChance / 100.0) + Math.random() <
                (this.statusChance % 100) / 100.0
                ? 1
                : 0,
        );
        const procTypes: DamageType[] = [];
        const usefulTable: ReadonlyArray<[DamageType, number]> = Object.keys(
            this.damageDistribution,
        )
            .map((s: string): [string, number] => {
                return [s, (this.damageDistribution as Record<string, number>)[s]];
            })
            .filter((s: [string, number]): boolean => s[1] !== 0) as ReadonlyArray<
            [DamageType, number]
        >;
        const max_n: number = Encodex.Util.List.fold0(
            (a: number, b: number): number => a + b,
            usefulTable.map((s: [DamageType, number]): number => s[1]),
        );
        for (let i: number = 0; i < proc_count; i++) {
            const n: number = Math.random() * (max_n + 1);
            for (let j: number = 0; j < usefulTable.length; j++) {
                if (n > usefulTable[j][1]) {
                    if (j >= usefulTable.length) {
                        procTypes.push(usefulTable[j][0]);
                        break;
                    } else {
                        continue;
                    }
                } else {
                    procTypes.push(usefulTable[j][0]);
                    break;
                }
            }
        }

        const procs: ReadonlyArray<StatusEffect> = (procTypes as ReadonlyArray<DamageType>).map(
            (proc: DamageType): StatusEffect =>
                new StatusEffect(
                    proc as StatusEffectType,
                    ProcDurationTable[proc as string],
                    this.attackedCard,
                    this.attackerCard,
                    this,
                ),
        );

        return procs;
    }

    public getActualCritChance(): number {
        return (
            this.criticalChance +
            10 *
                (Object.keys(this.attackedCard.getProcs()).includes("Puncture")
                    ? this.attackedCard.getProcs()["Puncture"]!.length
                    : 0)
        );
    }

    public getActualCriticalMultiplier(): number {
        return (
            this.criticalDamageMultiplier +
            0.05 *
                (Object.keys(this.attackedCard.getProcs()).includes("Cold")
                    ? this.attackedCard.getProcs()["Cold"]!.length
                    : 0)
        );
    }

    public calculateDamage(): { health: number; shield: number; overguard: number } {
        let damageToHealth: number = 0;
        let damageToShields: number = 0;
        let damageToOverguard: number = 0;

        Object.keys(this.getDDD()).map(
            (s: string): number =>
                (this.getDDD() as any)[s] *
                FactionDamageMultipliers[this.attackedCard.getFaction()].filter(
                    (el: [DamageType, 1.5 | 0.5]): boolean => (el[0] as string) === s,
                )[0][1],
        );

        const criticalHit: boolean =
            this.getActualCritChance() >= 100
                ? true
                : Math.random() * 100 <= this.getActualCritChance();

        const critLevel: number =
            (this.getActualCritChance() % 100) +
            (Math.random() * 100 <= this.getActualCritChance() - 100 * this.getActualCritChance()
                ? 1
                : 0);

        const finalCritMultiplier: number = criticalHit
            ? critLevel - 1 + this.getActualCritChance()
            : 0;

        if (this.attackedCard.getOverguard() !== 0) {
            damageToOverguard = Encodex.Util.List.fold0(
                (a: number, b: number): number => a + b,
                (Object.keys(this.getDDD()) as Array<DamageType>)
                    .map((s: DamageType): [DamageType, number] => [s, (this.getDDD() as any)[s]])
                    .map((s: [DamageType, number]): number =>
                        s[0] == "Magnetic" || s[0] == "Void" ? s[1] * 1.5 : s[1],
                    ),
            );
        } else if (this.attackedCard.getShields() !== 0) {
            if (this.hasDamageType("Toxin")) {
                damageToHealth = this.getDDD()["Toxin"]! * armorDR(this.attackedCard.getArmor());
            }
            damageToShields =
                ((arr: Array<DamageType>): number =>
                    arr.length === 0
                        ? 0
                        : ((m_arr: Array<DamageType>): number => {
                              return (
                                  (damageToShields = Encodex.Util.List.fold0(
                                      (a: number, b: number): number => a + b,
                                      m_arr.map(
                                          (damageType: DamageType): number =>
                                              (this.getDDD() as any)[damageType] *
                                              ((
                                                  [
                                                      "Magnetic",
                                                      "Electricity",
                                                  ] satisfies ReadonlyArray<DamageType> as ReadonlyArray<string>
                                              ).includes(damageType)
                                                  ? 1.5
                                                  : 1),
                                      ),
                                  )),
                                  1
                              );
                          })(arr))(
                    Encodex.Util.List.reject(
                        (a: DamageType): boolean => a === "Toxin",
                        Object.keys(this.getDDD()) as Array<DamageType>,
                    ),
                ) *
                (Object.keys(this.attackedCard.getProcs()).includes("Magnetic")
                    ? this.attackedCard.getProcs()["Magnetic"]!.length - 1 * 25 + 100
                    : 1);
        } else if (this.attackedCard.getHealth() !== 0) {
            damageToHealth =
                (Object.keys(this.getDDD()).includes("Slash" satisfies DamageType)
                    ? (this.getDDD() as any)["Slash"]
                    : 0) +
                Encodex.Util.List.fold0(
                    (a: number, b: number): number => a + b,
                    Encodex.Util.List.reject(
                        (a: string): boolean => a == ("Slash" satisfies DamageType),
                        Object.keys(this.getDDD()),
                    ).map((damageType: string): number => (this.getDDD() as any)[damageType]),
                ) *
                    (Object.keys(this.attackedCard.getProcs()).includes("Viral")
                        ? this.attackedCard.getProcs()["Viral"]!.length - 1 * 25 + 100
                        : 1) *
                    armorDR(this.attackedCard.getArmor());
        }

        this.damage = {
            health: damageToHealth * finalCritMultiplier,
            shield: damageToShields * finalCritMultiplier,
            overguard: damageToOverguard * finalCritMultiplier,
        };

        return {
            health: damageToHealth * finalCritMultiplier,
            shield: damageToShields * finalCritMultiplier,
            overguard: damageToOverguard * finalCritMultiplier,
        };
    }

    public getDamage(): { health: number; shield: number; overguard: number } {
        return this.damage;
    }
}
