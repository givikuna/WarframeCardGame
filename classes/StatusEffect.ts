import { Board } from "./Board";
import { Player } from "./Player";
import { Card } from "./Card";
import { DamageInstance } from "./DamageInstance";

import { StatusEffectFactory } from "../factories/StatusEffectFactory";

import { Effect } from "../interfaces/Effect";

import { StatusEffectType } from "../types/enums";

export class StatusEffect {
    private appliedTo: Card;
    private appliedBy: Card | Effect;

    private statusEffectType: StatusEffectType;

    private duration: number;

    public constructor(
        appliedTo: Card,
        appliedBy: Card | Effect,
        statusEffectType: StatusEffectType,
        duration: number,
    ) {
        this.appliedTo = appliedTo;
        this.appliedBy = appliedBy;

        this.statusEffectType = statusEffectType;

        this.duration = duration;
    }

    // -- // --

    public getAppliedTo(): Card {
        return this.appliedTo;
    }

    public getAppliedBy(): Card | Effect {
        return this.appliedBy;
    }

    public getType(): StatusEffectType {
        return this.statusEffectType;
    }

    public getDuration(): number {
        return this.duration;
    }

    // -- // --

    public tick(player: Player, board: Board): void {
        this.duration--;
        switch (this.statusEffectType) {
            case StatusEffectType.Slash:
                new DamageInstance(this.getAppliedTo(), this.getAppliedBy(), { Slash: 15 }, 0, 10, 1.5).apply(
                    player,
                );
                break;
            case StatusEffectType.Electricity:
                new DamageInstance(this.getAppliedTo(), this.getAppliedBy(), { Electricity: 8 }, 3, 5, 1.5).apply(
                    player,
                );
                board[`getPlayer${this.getAppliedTo().getOwner()}`]()
                    .getCards()
                    .forEach((card: Card): void => {
                        if (Math.random() < 0.10001)
                            card.applyStatusEffect(
                                StatusEffectFactory.manufacture(
                                    this.getAppliedTo(),
                                    this.getAppliedBy(),
                                    StatusEffectType.Electricity,
                                ),
                            );
                    });
                break;
            case StatusEffectType.Heat:
                new DamageInstance(this.getAppliedTo(), this.getAppliedBy(), { Heat: 8 }, 10, 10, 1.7).apply(
                    player,
                );
                break;
            case StatusEffectType.Toxin:
                new DamageInstance(this.getAppliedTo(), this.getAppliedBy(), { Toxin: 8 }, 0, 3, 1.65).apply(
                    player,
                );
                break;
            case StatusEffectType.Blast:
                // TBA
                break;
            case StatusEffectType.Gas:
                new DamageInstance(this.getAppliedTo(), this.getAppliedBy(), { Gas: 5 }, 2, 15, 1.85).apply(
                    player,
                );
                board[`getPlayer${this.getAppliedTo().getOwner()}`]()
                    .getCards()
                    .forEach((card: Card): void => {
                        new DamageInstance(card, this.getAppliedBy(), { Gas: 5 }, 7, 15, 1.85).apply(player);
                    });
                break;
            default: // Impact, Puncture Corrosive, Magnetic, Radiation, Viral, Void, Tau
                break;
        }
    }

    // -- // --
}
