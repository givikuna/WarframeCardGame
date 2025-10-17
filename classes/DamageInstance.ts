import { DamageDistributionDictionary, StatusEffectType } from "../types/types";
import { damageTypeToStatus } from "../constants/constants";
import { Card } from "./Card";

export class DamageInstance {
    protected totalDamage: number;
    protected damageDistribution: DamageDistributionDictionary;
    protected statusChance: number;
    protected criticalChance: number;
    protected criticalDamageMultiplier: number;
    protected appliedStatusEffects: ReadonlyArray<StatusEffectType>;
    protected finalDamage: number;
    protected targetCard: Card;
    protected dealerCard: Card;

    public constructor(
        totalDamage: number = 0,
        damageDistribution: DamageDistributionDictionary = {},
        statusChance: number = 0,
        criticalChance: number = 0,
        criticalDamageMultiplier: number = 1,
        targetCard: Card,
        dealerCard: Card,
    ) {
        this.totalDamage = totalDamage;
        this.damageDistribution = damageDistribution;
        this.statusChance = statusChance;
        this.criticalChance = criticalChance;
        this.criticalDamageMultiplier = criticalDamageMultiplier;
        this.targetCard = targetCard;
        this.dealerCard = dealerCard;

        this.appliedStatusEffects = ((
            sc: number,
            dd: DamageDistributionDictionary,
        ): ReadonlyArray<StatusEffectType> => {
            const statusApplies: boolean = Math.random() <= sc / 100.0;
            if (!statusApplies) return [];
            const statusChanceCount: number =
                Math.floor(sc / 100.0) + (Math.random() <= (sc % 100) / 100.0 ? 1 : 0);
            const statusEffects: StatusEffectType[] = [];
            const possibleStatusEffects: ReadonlyArray<StatusEffectType> = [
                ...Object.keys(dd),
            ] as ReadonlyArray<StatusEffectType>;
            for (let i: number = 0; i < statusChanceCount; i++) {
                const r: number = Math.random() * this.totalDamage;
                for (let j: number = 0; j < possibleStatusEffects.length; j++) {
                    if (
                        r <
                        ((dd[
                            possibleStatusEffects[j] as keyof DamageDistributionDictionary
                        ] as number) /
                            100.0) *
                            this.totalDamage
                    ) {
                        statusEffects.push(damageTypeToStatus[possibleStatusEffects[j]]);
                        break;
                    }
                }
            }

            return statusEffects;
        })(
            this.statusChance + 10 * this.targetCard.getStatusEffects()["Tau"].length,
            this.damageDistribution,
        );

        this.finalDamage =
            (this.targetCard.getStatusEffects()["Invisible"].length > 0 ? 7 : 1) *
            ((crit: number, dmg: number, td: number): number =>
                Math.random() <= crit / 100.0
                    ? td * dmg +
                      (crit < 100
                          ? 0
                          : Math.floor(crit / 100.0) +
                            (Math.random() <= (crit % 100) / 100.0 ? 1 : 0) +
                            (this.targetCard.getStatusEffects()["Invisible"].length > 0 ? 4 : 1))
                    : td)(
                this.criticalChance + 5 * this.targetCard.getStatusEffects()["Puncture"].length,
                this.criticalDamageMultiplier,
                this.totalDamage,
            ) *
            (this.targetCard.getShield() !== 0 ? 0.5 : 1) *
            (this.targetCard.getShield() === 0
                ? this.targetCard.getArmor() === 0
                    ? 1
                    : (this.targetCard.getArmor() -
                          this.targetCard.getArmor() *
                              (this.targetCard.getStatusEffects()["Corrosive"].length * 0.09)) /
                      (this.targetCard.getArmor() -
                          this.targetCard.getArmor() *
                              (this.targetCard.getStatusEffects()["Corrosive"].length * 0.09) +
                          300)
                : 0.5 * (2 + 0.25 * (this.targetCard.getStatusEffects()["Magnetic"].length - 1)));
    }

    public getBaseDamage(): number {
        return this.totalDamage;
    }

    public getDealerCard(): Card {
        return this.dealerCard;
    }

    public getStatusEffects(): ReadonlyArray<StatusEffectType> {
        return this.appliedStatusEffects;
    }

    public getFinalDamage(): number {
        return this.finalDamage;
    }
}
