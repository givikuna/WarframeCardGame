import { Encodex } from "@givi-tsvariani/encodex";
import * as Ramda from "ramda";
import * as _ from "underscore";

import { Card } from "./Card";
import { StatusEffect } from "./StatusEffect";

import {
    DamageDistributionDictionary,
    AttackType,
    DamageType,
    StatusEffectType,
    DamageTable,
} from "../types/types";

import { FactionDamageMultipliers } from "../constants/constants";

import { armorDR } from "../modules/armorDR";
import { ProcFactory } from "../modules/ProcFactory/ProcFactory";

export class DamageInstance {
    protected damageDistribution: DamageDistributionDictionary;
    protected criticalChance: number;
    protected criticalDamageMultiplier: number;
    protected statusChance: number;
    protected attackerCard: Card;
    protected attackedCard: Card;
    protected attackType: AttackType;
    protected calculatedProcs: ReadonlyArray<StatusEffect> = [];
    protected ran1: boolean = false;
    protected ran2: boolean = false;

    protected damage: DamageTable = {
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
        return Object.keys(this.getDDD()).includes(s) && (this.getDDD() as any)[s] > 0;
    }

    public calculateStatusEffects(): ReadonlyArray<StatusEffect> {
        if (this.ran1) return this.calculatedProcs;
        this.ran1 = true;

        const proc_count: number =
            this.statusChance < 100
                ? Math.random() * 100.0 < this.statusChance
                    ? 1
                    : 0
                : Math.floor(this.statusChance / 100.0) +
                  (Math.random() * 100.0 < this.statusChance % 100 ? 1 : 0);

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
                ProcFactory.manufacture(
                    proc as StatusEffectType,
                    this.attackerCard,
                    this.attackedCard,
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

    public calculateDamage(): DamageTable {
        if (this.ran2) return this.getDamage();
        this.ran2 = true;

        let damageToHealth: number = 0;
        let damageToShields: number = 0;
        let damageToOverguard: number = 0;

        if (FactionDamageMultipliers[this.attackedCard.getFaction()].length !== 0) {
            Object.keys(this.getDDD()).forEach((s: string): void => {
                (this.getDDD() as any)[s] *= [
                    ...FactionDamageMultipliers[this.attackedCard.getFaction()],
                ]
                    .map((m_arr: Readonly<[DamageType, 1.5 | 0.5]>): [DamageType, 1.5 | 0.5] => [
                        ...m_arr,
                    ])
                    .filter(
                        (el: [DamageType, 1.5 | 0.5]): boolean => (el[0] as string) === s,
                    )[0][1];
            });
        }

        const criticalHit: boolean =
            this.getActualCritChance() >= 100
                ? true
                : Math.abs(Math.random() + 0.0001) * 100 <= this.getActualCritChance();

        const critLevel: number =
            Math.ceil(this.getActualCritChance() / 100) +
            (Math.random() * 100 <= this.getActualCritChance() - 100 * this.getActualCritChance()
                ? 1
                : 0);

        const finalCritMultiplier: number = criticalHit
            ? critLevel - 1 + this.getActualCriticalMultiplier()
            : 1;

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

            const damageTypesWithoutToxin: ReadonlyArray<string> = Object.keys(
                this.getDDD(),
            ).filter((s: string): boolean => s !== "Toxin");

            for (let i: number = 0; i < damageTypesWithoutToxin.length; i++) {
                damageToShields +=
                    (this.getDDD() as any)[damageTypesWithoutToxin[i]] *
                    (["Magnetic", "Electricity"].includes(damageTypesWithoutToxin[i]) ? 1.5 : 1);
            }

            damageToShields *=
                (100 +
                    (this.attackedCard.getProcs()["Magnetic"]!.length > 0
                        ? 100 + 25 * (this.attackedCard.getProcs()["Magnetic"]!.length - 1)
                        : 0)) /
                100;

            damageToShields *= 0.5;
        } else if (this.attackedCard.getHealth() !== 0) {
            if (this.hasDamageType("Slash")) {
                damageToHealth += (this.getDDD() as any)["Slash"];
            }

            if (Object.keys(this.getDDD()).length > 1)
                damageToHealth +=
                    _.chain(Object.keys(this.getDDD()) as DamageType[])
                        .reject((dt: DamageType): boolean => dt === "Slash")
                        .map(
                            (dt: DamageType): number => (this.getDDD() as any)[dt] satisfies number,
                        )
                        .foldl(Ramda.add, 0)
                        .value() * armorDR(this.attackedCard.getArmor());
            else if (Object.keys(this.getDDD()).length === 1 && !this.hasDamageType("Slash"))
                damageToHealth +=
                    _.chain(Object.keys(this.getDDD()) as DamageType[])
                        .map(
                            (dt: DamageType): number => (this.getDDD() as any)[dt] satisfies number,
                        )
                        .foldl(Ramda.add, 0)
                        .value() * armorDR(this.attackedCard.getArmor());

            if (this.attackedCard.hasProc("Viral"))
                damageToHealth *= this.attackedCard.getProcs()["Viral"]!.length - 1 * 25 + 100;
        }

        damageToHealth = Math.ceil(damageToHealth * finalCritMultiplier);
        damageToShields = Math.ceil(damageToShields * finalCritMultiplier);
        damageToOverguard = Math.ceil(damageToOverguard * finalCritMultiplier);

        this.damage = {
            health: damageToHealth,
            shield: damageToShields,
            overguard: damageToOverguard,
        };

        return {
            health: damageToHealth,
            shield: damageToShields,
            overguard: damageToOverguard,
        };
    }

    public getDamage(): { health: number; shield: number; overguard: number } {
        return this.damage;
    }
}
