import { Board } from "../Board";
import { Player } from "../Player";
import { Card } from "../Card";
import { StatusEffect } from "../StatusEffect";
import { DamageInstance } from "../DamageInstance";

import { Effect } from "../../interfaces/Effect";

import { StatusEffectType } from "../../types/enums";

export class Heat extends StatusEffect {
    public constructor(
        appliedTo: Card,
        appliedBy: Card | Effect,
        statusEffectType: StatusEffectType,
        duration: number,
    ) {
        super(appliedTo, appliedBy, statusEffectType, duration);
    }

    public override tick(player: Player, board: Board): void {
        this.duration--;
        new DamageInstance(this.getAppliedTo(), this.getAppliedBy(), { Heat: 8 }, 10, 10, 1.7).apply(
            player,
            board,
        );
    }
}
