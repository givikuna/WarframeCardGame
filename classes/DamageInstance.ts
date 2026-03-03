import { Card } from "./Card";
import { StatusEffect } from "./StatusEffect";

import * as ramda from "ramda";

import { DamageDistributionTable } from "../types/types";

import { DamageType, StatusEffectType } from "../types/enums";

import { HealthClassDamageMultipliers } from "../constants/constants";

export class DamageInstance {
    private appliedTo: Card;
    private appliedBy: Card;

    private ddd: DamageDistributionTable;
    private statusChance: number;
    private criticalChance: number;
    private criticalDamageMultiplier: number;

    public constructor(
        appliedTo: Card,
        appliedBy: Card,
        ddd: DamageDistributionTable,
        statusChance: number,
        criticalChance: number,
        criticalDamageMultiplier: number,
    ) {
        this.appliedTo = appliedTo;
        this.appliedBy = appliedBy;

        this.ddd = ddd;
        this.statusChance = statusChance;
        this.criticalChance = criticalChance;
        this.criticalDamageMultiplier = criticalDamageMultiplier;
    }

    //

    public getAppliedTo(): Card {
        return this.appliedTo;
    }

    public getAppliedBy(): Card {
        return this.appliedBy;
    }

    public getDDD(): DamageDistributionTable {
        return this.ddd;
    }

    public getStatusChance(): number {
        return (
            this.statusChance +
            10 *
                this.getAppliedTo()
                    .getStatusEffects()
                    .filter((statusEffect: StatusEffect): boolean => statusEffect.getType() === StatusEffectType.Tau)
                    .length
        );
    }

    public getCriticalChance(): number {
        return (
            this.criticalChance +
            5 *
                this.getAppliedTo()
                    .getStatusEffects()
                    .filter(
                        (statusEffect: StatusEffect): boolean => statusEffect.getType() === StatusEffectType.Puncture,
                    ).length
        );
    }

    public getCriticalDamageMultiplier(): number {
        return (
            this.criticalDamageMultiplier +
            0.1 *
                this.getAppliedTo()
                    .getStatusEffects()
                    .filter(
                        (statusEffect: StatusEffect): boolean => statusEffect.getType() === StatusEffectType.Puncture,
                    ).length
        );
    }

    //

    public apply(): void {
        const critLevel: number =
            (Math.random() < (this.getCriticalChance() % 100) / 100 ? 1 : 0) +
            Math.floor(this.getCriticalChance() / 1000);

        Object.keys(this.getDDD()).forEach((key: string): void => {
            let arr: Array<Readonly<[DamageType, 1.5 | 0.5]>> = HealthClassDamageMultipliers[
                this.getAppliedTo().getHealthClass()
            ].filter((x: Readonly<[DamageType, 1.5 | 0.5]>): boolean => x[0] === DamageType[key]);

            this.ddd[key] *= arr.length === 0 ? 1 : arr[0][1];

            this.ddd[key] *= this.getCriticalDamageMultiplier() * critLevel;
        });

        const dmgToOverguard: number = ramda.sum(
            Object.keys(this.getDDD()).map(
                (x: string): number => this.ddd[x] * (x === "Magnetic" || x === "Void" ? 1.5 : 1),
            ),
        );

        const dmgToShields: number = ramda.sum(
            Object.keys(this.getDDD()).map(
                (x: string): number => this.ddd[x] * (x === "Magnetic" || x === "Electricity" ? 1.5 : 1),
            ),
        );

        //
    }
}
