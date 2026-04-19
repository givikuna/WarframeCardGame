import { Board } from "../Board";
import { Player } from "../Player";
import { Card } from "../Card";
import { StatusEffect } from "../StatusEffect";
import { DamageInstance } from "../DamageInstance";

import { Effect } from "../../interfaces/Effect";
import { StatusEffectType } from "../../types/enums";

export class Gas extends StatusEffect {
    public constructor(appliedTo: Card, appliedBy: Card | Effect, duration: number) {
        super(appliedTo, appliedBy, StatusEffectType.Gas, duration);
    }

    public override tick(player: Player, board: Board): void {
        this.duration--;
        const ownerPlayerNumber = this.getAppliedTo().getOwner().getPlayerNumber();

        board[`getPlayer${ownerPlayerNumber}`]()
            .getCards()
            .forEach((card: Card): void => {
                new DamageInstance(card, this.getAppliedBy(), { Gas: 5 }, 7, 15, 1.85).apply(player, board);
            });
    }
}
