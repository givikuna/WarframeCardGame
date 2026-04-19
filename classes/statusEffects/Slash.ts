import { Board } from "../Board";
import { Player } from "../Player";
import { Card } from "../Card";
import { StatusEffect } from "../StatusEffect";
import { DamageInstance } from "../DamageInstance";

import { Effect } from "../../interfaces/Effect";
import { StatusEffectType } from "../../types/enums";

export class Slash extends StatusEffect {
    public constructor(appliedTo: Card, appliedBy: Card | Effect, duration: number) {
        super(appliedTo, appliedBy, StatusEffectType.Slash, duration);
    }

    public override tick(player: Player, board: Board): void {
        this.duration--;
        new DamageInstance(this.getAppliedTo(), this.getAppliedBy(), { Slash: 15 }, 0, 10, 1.5).apply(
            player,
            board,
        );
    }
}
