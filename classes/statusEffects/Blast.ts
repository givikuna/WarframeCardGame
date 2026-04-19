import { Board } from "../Board";
import { Player } from "../Player";
import { Card } from "../Card";
import { StatusEffect } from "../StatusEffect";
import { DamageInstance } from "../DamageInstance";

import { Effect } from "../../interfaces/Effect";
import { StatusEffectType } from "../../types/enums";

export class Blast extends StatusEffect {
    private detonated: boolean = false;

    public constructor(appliedTo: Card, appliedBy: Card | Effect, duration: number) {
        super(appliedTo, appliedBy, StatusEffectType.Blast, duration);
    }

    public override tick(player: Player, board: Board): void {
        if (this.detonated || this.duration <= 0) {
            return;
        }

        this.duration--;

        const appliedTo: Card = this.getAppliedTo();
        const ownerPlayerNumber: 1 | 2 = appliedTo.getOwner().getPlayerNumber();
        const blastStacks: ReadonlyArray<Blast> = appliedTo
            .getStatusEffects()
            .filter(
                (se: StatusEffect): boolean => se.getType() === StatusEffectType.Blast && se.getDuration() > 0,
            ) as Blast[];

        if (blastStacks.length >= 5) {
            board[`getPlayer${ownerPlayerNumber}`]()
                .getCards()
                .forEach((card: Card) => {
                    new DamageInstance(card, this.getAppliedBy(), { Blast: 5 }, 0, 0, 1).apply(player, board);
                });

            blastStacks.forEach((se: Blast) => {
                if (se instanceof Blast) {
                    se.duration = 0;
                    se.detonated = true;
                }
            });

            return;
        }

        if (this.duration === 0) {
            this.detonated = true;
            board[`getPlayer${ownerPlayerNumber}`]()
                .getCards()
                .forEach((card: Card) => {
                    new DamageInstance(card, this.getAppliedBy(), { Blast: 6 }, 0, 0, 1).apply(player, board);
                });
        }
    }
}
