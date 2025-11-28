import { Board } from "./Board";
import { DamageInstance } from "./DamageInstance";
import { StatusEffect } from "./StatusEffect";
import { Ability } from "./Ability";
import { ProcFactory } from "./modules/ProcFactory/ProcFactory";

import {
    HealthType,
    DamageType,
    Faction,
    ProcTable,
    StatusEffectType,
    DamageTable,
} from "../types/types";

import { FactionDamageMultipliers, procMaxStacks } from "../constants/constants";

import { noop } from "./modules/noop";

export class Card {
    protected readonly name: string;
    protected readonly faction: Faction;
    protected readonly healthType: HealthType;

    protected health: number;
    protected readonly maxHealth: number;

    protected shields: number;
    protected readonly maxShields: number;

    protected overshields: number;
    protected readonly maxOvershields: number = 1200;

    protected armor: number;
    protected readonly baseArmor: number;

    protected overguard: number;
    protected readonly maxOverguard: number;

    protected energy: number;
    public readonly maxEnergy: number;
    public readonly startingEnergy: number;

    protected readonly abilities: ReadonlyArray<Ability>;

    protected readonly board: Board;
    protected readonly locationOnBoard: number;

    protected chanceToFailCast: { [n: number]: number } = {}; // {abilityNumber: percent chance}
    protected readonly player: 0 | 1 | 2;

    protected procs: ProcTable = {
        Impact: [],
        Puncture: [],
        Slash: [],
        Cold: [],
        Electricity: [],
        Heat: [],
        Toxin: [],
        Blast: [],
        Corrosive: [],
        Gas: [],
        Magnetic: [],
        Radiation: [],
        Viral: [],
        Void: [],
        Tau: [],
        Flying: [],
        Disarmed: [],
        Disabled: [],
        Invisible: [],
        Invincible: [],
        Blinded: [],
    };

    protected statuses: { [status: string]: boolean } = {};

    public constructor(
        name: string,
        faction: Faction,
        healthType: HealthType,
        health: number,
        shield: number,
        armor: number,
        overguard: number,
        startingEnergy: number,
        maxEnergy: number,
        abilities: Ability[],
        board: Board,
        locationOnBoard: number,
        player: 0 | 1 | 2,
    ) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.shields = shield;
        this.maxShields = shield;
        this.armor = armor;
        this.baseArmor = armor;
        this.overguard = overguard;
        this.maxOverguard = overguard;
        this.maxEnergy = maxEnergy;
        this.startingEnergy = startingEnergy;
        this.energy = startingEnergy;
        this.abilities = abilities;
        this.faction = faction;
        this.healthType = healthType;
        this.overshields = 0;
        this.board = board;
        this.locationOnBoard = locationOnBoard;
        this.player = player;
    }

    public getName(): string {
        return this.name;
    }

    public getFaction(): Faction {
        return this.faction;
    }

    public getAffiliations(): HealthType {
        return this.healthType;
    }

    public getHealth(): number {
        return this.health;
    }

    public getMaxHealth(): number {
        return this.maxHealth;
    }

    public getShields(): number {
        return this.shields;
    }

    public getMaxShields(): number {
        return this.maxShields;
    }

    public getArmor(): number {
        return this.armor;
    }

    public getBaseArmor(): number {
        return this.baseArmor;
    }

    public getOverguard(): number {
        return this.overguard;
    }

    public getMaxOverguard(): number {
        return this.maxOverguard;
    }

    public getEnergy(): number {
        return this.energy;
    }

    public getStartingEnergy(): number {
        return this.startingEnergy;
    }

    public getMaxEnergy(): number {
        return this.maxEnergy;
    }

    public getOvershields(): number {
        return this.overshields;
    }

    public getAbilities(): ReadonlyArray<Ability> {
        return [...this.abilities];
    }

    public getPassive(): Ability {
        return this.abilities[0];
    }

    public getProcs(): Readonly<ProcTable> {
        return this.procs;
    }

    public getDamageMultiplierForDamageType(damageType: DamageType): number {
        return ((arr: [DamageType, 0.5 | 1.5][]): number => (arr.length > 0 ? arr[0][1] : 1))(
            [...FactionDamageMultipliers[this.getFaction()]]
                .map((m_arr: Readonly<[DamageType, 1.5 | 0.5]>): [DamageType, 1.5 | 0.5] => [
                    ...m_arr,
                ])
                .filter((dmgInfo: [DamageType, 0.5 | 1.5]): boolean => dmgInfo[0] === damageType),
        );
    }

    public applyProc(proc: StatusEffect): void {
        this.procs[proc.getProcType()]!.push(proc);
        if (
            proc.getProcType() !== "Blast" &&
            this.procs[proc.getProcType()]!.length > procMaxStacks[proc.getProcType()]
        ) {
            this.procs[proc.getProcType()]! = this.procs[proc.getProcType()]!.filter(
                (_proc: StatusEffect, i: number): boolean => i > 0,
            );
        }

        if (proc.getProcType() == "Blast" && this.procs["Blast"]!.length == 4) {
            this.applyDamage(proc.getDoT()!);
            this.procs["Blast"] = [];
        }

        if (["Gas", "Electricity"].includes(proc.getProcType()) && proc.isDirect()) {
            this.board
                .getLocations()
                [this.locationOnBoard - 1][
                    this.player == 1 ? "getPlayerOneCards" : "getPlayerTwoCards"
                ]()
                .forEach((card: Card): void =>
                    Math.random() <
                    (proc.getProcType() == "Gas"
                        ? 0.85
                        : proc.getProcType() == "Electricity"
                        ? 0.15
                        : 0.01)
                        ? card.applyProc(
                              ProcFactory.manufacture(
                                  proc.getProcType(),
                                  proc.getInflictor(),
                                  card,
                                  proc.getDI()!,
                              ).makeIndirect(),
                          )
                        : noop(),
                );
        }
    }

    public applyDamage(dmg: DamageInstance): void {
        const dmgInfo: DamageTable = dmg.calculateDamage();

        dmg.calculateStatusEffects().forEach((statusEffect: StatusEffect): void =>
            this.applyProc(statusEffect),
        );
        if (
            this.procs["Magnetic"]!.length > 0 &&
            ((this.overguard > 0 && this.overguard - dmgInfo.overguard <= 0) ||
                (this.shields > 0 && this.shields - dmgInfo.shield <= 0))
        ) {
            this.procs["Electricity"]!.push(
                ProcFactory.manufacture(
                    "Electricity",
                    this.procs["Magnetic"]![0].getInflictor(),
                    this,
                    10,
                ),
            );
        }

        this.overguard -= dmgInfo.overguard;
        this.shields -= dmgInfo.shield;
        this.health -= dmgInfo.health;
        if (this.overguard <= 0) this.overguard = 0;
        if (this.shields <= 0) this.shields = 0;
        if (this.health <= 0) this.health = 0;
    }

    public nextTurn(): void {
        (Object.keys(this.procs) as StatusEffectType[]).forEach(
            (procType: StatusEffectType): void => {
                this.procs[procType]!.forEach((proc: StatusEffect): void =>
                    this.applyDamage(proc.nextTurn().getDoT()!),
                );
                this.procs[procType]! = this.procs[procType]!.filter(
                    (proc: StatusEffect): boolean => proc.getDuration() > 0,
                );
            },
        );
    }

    public isDead(): boolean {
        return this.health <= 0;
    }

    public castAbility(abilityNumber: number): void {
        //
    }
}
