import { Board } from "../Board";
import { Player } from "../Player";
import { Card } from "../Card";
import { StatusEffect } from "../StatusEffect";
import { DamageInstance } from "../DamageInstance";

import { Effect } from "../../interfaces/Effect";
import { StatusEffectType } from "../../types/enums";

export class Toxin extends StatusEffect {
    public constructor(appliedTo: Card, appliedBy: Card | Effect, duration: number) {
        super(appliedTo, appliedBy, StatusEffectType.Toxin, duration);
    }

    public override tick(player: Player, board: Board): void {
        this.duration--;
        new DamageInstance(this.getAppliedTo(), this.getAppliedBy(), { Toxin: 8 }, 0, 3, 1.65).apply(
            player,
            board,
        );
    }
}
