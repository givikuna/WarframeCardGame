import * as ramda from "ramda";

import { EventManager } from "../game/events/EventManager";

import { Player } from "./Player";
import { Board } from "./Board";
import { StatusEffect } from "./StatusEffect";

import { noop } from "underscore";

import { ICard } from "../interfaces/ICard";

import { CardActionData, TargetingFunction } from "../types/types";

import { ActionType, CardClass, HealthClass, Rarity, StatusEffectType } from "../types/enums";
import { Operator } from "./Operator";
import { Action } from "./Action";
import { togglePlayerNumber } from "../modules/togglePlayerNumber";

export class Card {
    private name: string;
    private uid: string;
    private iid: string;

    private owner: Player;

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

    private age: number = 0;

    private em: EventManager;

    public constructor(card: ICard, iid: string, owner: Player, em: EventManager) {
        this.iid = iid;

        [this.name, this.uid, this.maxHealth, this.maxShields, this.maxHealth, this.maxShields] = Object.keys(card)
            .filter(
                (s: string): boolean =>
                    !["overguard", "healthClass", "cardClass", "rarity", "actions"].includes(s),
            )
            .map((key: string): any => card[key]);

        this.currentHealth = this.maxHealth;
        this.currentShields = this.maxShields;

        this.overguard = card.overguard;

        this.healthClass = HealthClass[card.healthClass];

        this.cardClass = CardClass[card.cardClass];

        this.rarity = Rarity[card.rarity];

        this.actions = card.actions;

        this.owner = owner;

        this.em = em;
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

    public getOwner(): Player {
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

    public getEventManager(): EventManager {
        return this.em;
    }

    public getCardClass(): CardClass {
        return this.cardClass;
    }

    public getRarity(): Rarity {
        return this.rarity;
    }

    public getAge(): number {
        return this.age;
    }

    // -- // --

    public heal(healthToGain: number): void {
        this.takeDamage(-healthToGain, 0, 0);

        if (this.currentHealth > this.maxHealth) this.currentHealth = this.maxHealth;
    }

    public giveShield(shieldToGain: number): void {
        this.takeDamage(0, -shieldToGain, 0);
    }

    public giveOverguard(overguardToGain: number): void {
        this.takeDamage(0, 0, -overguardToGain);
    }

    public getOvershields(): number {
        return this.currentShields - this.maxShields;
    }

    public takeDamage(dmgToHealth: number, dmgToShield: number, dmgToOverguard: number): void {
        this.currentHealth -= Math.floor(dmgToHealth);
        this.currentShields -= Math.floor(dmgToShield);
        this.overguard -= Math.floor(dmgToOverguard);

        this.killIfDead();
    }

    public kill() {
        this.overguard = 0;
        this.currentShields = 0;
        this.currentHealth = 0;

        this.killIfDead();
    }

    public killIfDead() {
        if (this.currentHealth === 0) {
            this.status = "Dead";

            this.em.emit("CARD_DIED", { player: this.getOwner(), card: this });
        }
    }

    public applyStatusEffect(se: StatusEffect): void {
        this.statusEffects.push(se);
    }

    public isDead(): boolean {
        return this.status === "Dead";
    }

    public numberOfStacksOf(se: StatusEffectType): number {
        return this.getStatusEffects().filter((x: StatusEffect): boolean => x.getType() === se).length;
    }

    public hasStatusEffect(se: StatusEffectType): boolean {
        return this.numberOfStacksOf(se) > 0;
    }

    public canAct(): boolean {
        return this.hasStatusEffect(StatusEffectType.Disabled) ||
            this.numberOfStacksOf(StatusEffectType.Cold) === 10
            ? false
            : Math.random() * 100 >=
                  ramda.sum([
                      this.numberOfStacksOf(StatusEffectType.Impact) * 3.5,
                      this.numberOfStacksOf(StatusEffectType.Cold) * 2.5,
                      this.numberOfStacksOf(StatusEffectType.Heat) * 1,
                  ]);
    }

    public chooseTarget(targetingFunction: TargetingFunction, player: Player, board: Board): Card | Operator {
        const enemyPlayer: Player = board[`getPlayer${togglePlayerNumber(player.getPlayerNumber())}`]();
        const enemyPlayerCards: ReadonlyArray<Card> = enemyPlayer.getCards();
        const enemyPlayerTauntingCards: ReadonlyArray<Card> = enemyPlayer.getTauntingCards();

        if (enemyPlayerCards.length === 0) {
            return enemyPlayer.getOperator();
        }

        if (enemyPlayerTauntingCards.length > 0) {
            return enemyPlayerTauntingCards[0];
        }

        return targetingFunction(this, player, board) ?? enemyPlayerCards[0];
    }

    public tick(player: Player, board: Board): void {
        if (this.getAge() === 0) {
            this.getActions()
                .filter((x: CardActionData): boolean => x.action.getActionType() === ActionType.OnPlay)
                .map((x: CardActionData): Action => x.action)
                .forEach((action: Action): void => (this.canAct() ? action.act(this, player, board) : noop()));
        }

        this.getActions().forEach((x: CardActionData): void =>
            x.action.getActionType() === ActionType.OnTurn && this.canAct()
                ? x.action.act(this, player, board)
                : noop(),
        );

        this.getStatusEffects().forEach((s: StatusEffect): void => s.tick(player, board));

        this.age++;
    }
}
