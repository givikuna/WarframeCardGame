import { Board } from "../Board";
import { Player } from "../Player";
import { Card } from "../Card";
import { StatusEffect } from "../StatusEffect";
import { DamageInstance } from "../DamageInstance";
import { StatusEffectFactory } from "../../factories/StatusEffectFactory";

import { Effect } from "../../interfaces/Effect";
import { StatusEffectType } from "../../types/enums";

export class Electricity extends StatusEffect {
    public constructor(appliedTo: Card, appliedBy: Card | Effect, duration: number) {
        super(appliedTo, appliedBy, StatusEffectType.Electricity, duration);
    }

    public override tick(player: Player, board: Board): void {
        this.duration--;
        new DamageInstance(this.getAppliedTo(), this.getAppliedBy(), { Electricity: 8 }, 3, 5, 1.5).apply(
            player,
            board,
        );

        const ownerPlayerNumber = this.getAppliedTo().getOwner().getPlayerNumber();

        board[`getPlayer${ownerPlayerNumber}`]()
            .getCards()
            .forEach((card: Card): void => {
                // Ensure we don't apply it to the card already taking the tick
                if (card.getIID() !== this.getAppliedTo().getIID() && Math.random() < 0.10001) {
                    card.applyStatusEffect(
                        StatusEffectFactory.manufacture(
                            card, // Target the new card, not the original one
                            this.getAppliedBy(),
                            StatusEffectType.Electricity,
                        ),
                    );
                }
            });
    }
}
