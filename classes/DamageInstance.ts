import { Player } from "./Player";
import { Card } from "./Card";
import { StatusEffect } from "./StatusEffect";

import * as ramda from "ramda";

import { StatusEffectFactory } from "../factories/StatusEffectFactory";

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

    public apply(player: Player): void {
        this.applyStatusEffects();

        const critLevel: number = Math.floor(
            (Math.random() < (this.getCriticalChance() % 100) / 10.0 ? 1 : 0) +
                Math.floor(this.getCriticalChance() / 100.0),
        );

        Object.keys(this.getDDD()).forEach((key: string): void => {
            let arr: Array<Readonly<[DamageType, 1.5 | 0.5]>> = HealthClassDamageMultipliers[
                this.getAppliedTo().getHealthClass()
            ].filter((x: Readonly<[DamageType, 1.5 | 0.5]>): boolean => x[0] === DamageType[key]);

            this.ddd[key] *= arr.length === 0 ? 1 : arr[0][1];

            this.ddd[key] *= this.getCriticalDamageMultiplier() * critLevel;
        });

        let [dmgToHealth, dmgToShields, dmgToOverguard]: [number, number, number] =
            this.calculateDamageNumbers(critLevel);

        if (
            dmgToShields === this.getAppliedTo().getCurrentShields() &&
            this.getAppliedTo()
                .getStatusEffects()
                .filter((s: StatusEffect): boolean => s.getType() === StatusEffectType.Magnetic).length > 0
        ) {
            this.getAppliedTo().applyStatusEffect(
                StatusEffectFactory.manufacture(this.getAppliedTo(), this.getAppliedBy(), StatusEffectType.Electricity),
            );
        }

        this.getAppliedTo().takeDamage(dmgToHealth, dmgToShields, dmgToOverguard);

        player.dealtDamage(ramda.sum([dmgToHealth, dmgToShields, dmgToOverguard]));
    }

    private applyStatusEffects(): void {
        const statusEffectCount: number =
            Math.floor(this.getStatusChance() / 100) + Math.random() < (this.getStatusChance() % 100) / 100.0 ? 1 : 0;

        for (let i: number = 0; i < statusEffectCount; i++) {
            const rand: number = Math.floor(Math.random() * 100);
            const sum: number = ramda.sum(
                Object.keys(this.ddd)
                    .filter((x: string): boolean => x === "True")
                    .map((x: string): number => this.ddd[x]),
            );

            let amalgamSum: number = 0;

            Object.keys(this.ddd)
                .filter((x: string): boolean => x === "True")
                .forEach((x: string): void => {
                    amalgamSum += Math.floor((this.ddd[x] / sum) * 100);
                    if (amalgamSum >= rand) {
                        this.getAppliedTo().applyStatusEffect(
                            StatusEffectFactory.manufacture(
                                this.getAppliedTo(),
                                this.getAppliedBy(),
                                StatusEffectType[x],
                            ),
                        );
                    }
                });
        }
    }

    private calculateDamageNumbers(critLevel: number): [number, number, number] {
        const dmgToOverguard: number =
            ramda.sum(
                Object.keys(this.ddd).map(
                    (x: string): number => this.ddd[x] * (x === "Magnetic" || x === "Void" ? 1.5 : 1),
                ),
            ) *
            (1 +
                0.08 *
                    this.getAppliedTo()
                        .getStatusEffects()
                        .filter((x: StatusEffect): boolean => x.getType() === StatusEffectType.Magnetic).length);

        const dmgToShields: number =
            this.getAppliedTo().getOverguard() === 0
                ? ramda.sum(
                      Object.keys(this.ddd)
                          .filter((x: string): boolean => x !== "Toxin")
                          .map(
                              (x: string): number => this.ddd[x] * (x === "Magnetic" || x === "Electricity" ? 1.5 : 1),
                          ),
                  ) *
                  (1 +
                      0.08 *
                          this.getAppliedTo()
                              .getStatusEffects()
                              .filter((x: StatusEffect): boolean => x.getType() === StatusEffectType.Magnetic).length)
                : 0;

        const dmgToHealth: number =
            ramda.sum(
                (this.getAppliedTo().getOverguard() === 0
                    ? this.getAppliedTo().getCurrentShields() === 0
                        ? Object.keys(this.ddd)
                        : Object.keys(this.ddd).filter((x: string): boolean => x === "Toxin")
                    : Object.keys(this.ddd)
                ).map((x: string): number => this.ddd[x]),
            ) *
            (1 +
                0.08 *
                    this.getAppliedTo()
                        .getStatusEffects()
                        .filter((x: StatusEffect): boolean => x.getType() === StatusEffectType.Viral).length);

        return [dmgToHealth, dmgToShields, dmgToOverguard]
            .map((x: number): number => x * this.getCriticalDamageMultiplier() * critLevel)
            .map(Math.floor) as [number, number, number];
    }
}
