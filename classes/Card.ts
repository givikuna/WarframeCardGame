import { Player } from "./Player";
import { Board } from "./Board";
import { StatusEffect } from "./StatusEffect";

import { noop } from "underscore";

import { ICard } from "../interfaces/ICard";

import { CardActionData } from "../types/types";

import { ActionType, CardClass, HealthClass, Rarity } from "../types/enums";

export class Card {
    private name: string;
    private uid: string;
    private iid: string;

    private owner: 1 | 2;

    private maxHealth: number;
    private maxShields: number;

    private currentHealth: number;
    private currentShields: number;

    private overguard: number;

    private healthClass: HealthClass;

    private cardClass: CardClass;

    private rarity: Rarity;

    private actions: ReadonlyArray<CardActionData>;

    private statusEffects: StatusEffect[] = [];

    private status: "Alive" | "Dead" = "Alive";

    public constructor(card: ICard, iid: string, owner: 1 | 2) {
        this.iid = iid;

        [this.name, this.uid, this.maxHealth, this.maxShields, this.maxHealth, this.maxShields] = Object.keys(card)
            .filter((s: string): boolean => !["overguard", "healthClass", "cardClass", "rarity", "actions"].includes(s))
            .map((key: string): any => card[key]);

        this.currentHealth = this.maxHealth;
        this.currentShields = this.maxShields;

        this.overguard = card.overguard;

        this.healthClass = HealthClass[card.healthClass];

        this.cardClass = CardClass[card.cardClass];

        this.rarity = Rarity[card.rarity];

        this.actions = card.actions;

        this.owner = owner;
    }

    public getName(): string {
        return this.name;
    }

    public getUID(): string {
        return this.uid;
    }

    public getIID(): string {
        return this.iid;
    }

    public getOwner(): 1 | 2 {
        return this.owner;
    }

    public getMaxHealth(): number {
        return this.maxHealth;
    }

    public getMaxShields(): number {
        return this.maxShields;
    }

    public getCurrentHealth(): number {
        return this.currentHealth;
    }

    public getCurrentShields(): number {
        return this.currentShields;
    }

    public getOverguard(): number {
        return this.overguard;
    }

    public getHealthClass(): HealthClass {
        return this.healthClass;
    }

    public getActions(): ReadonlyArray<CardActionData> {
        return [...this.actions];
    }

    public getStatusEffects(): ReadonlyArray<StatusEffect> {
        return [...this.statusEffects];
    }

    public getCardClass(): CardClass {
        return this.cardClass;
    }

    public getRarity(): Rarity {
        return this.rarity;
    }

    // -- // --

    public heal(healthToGain: number): void {
        this.takeDamage(-healthToGain, 0, 0);
    }

    public giveShield(shieldToGain: number): void {
        this.takeDamage(0, -shieldToGain, 0);
    }

    public giveOverguard(overguardToGain: number): void {
        this.takeDamage(0, 0, -overguardToGain);
    }

    public takeDamage(dmgToHealth: number, dmgToShield: number, dmgToOverguard: number): void {
        this.currentHealth -= dmgToHealth;
        this.currentShields -= dmgToShield;
        this.overguard -= dmgToOverguard;

        this.kill();
    }

    public kill() {
        if (this.currentHealth === 0) {
            this.status = "Dead";
        }
    }

    public applyStatusEffect(se: StatusEffect): void {
        this.statusEffects.push(se);
    }

    public isDead(): boolean {
        return this.status === "Dead";
    }

    public tick(player: Player, board: Board): void {
        this.getActions().forEach((x: CardActionData): void =>
            x.action.getActionType() === ActionType.OnTurn ? x.action.act(this, player, board) : noop(),
        );

        this.getStatusEffects().forEach((s: StatusEffect): void => s.tick(player, board));
    }
}
