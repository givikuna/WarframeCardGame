import { Board } from "./Board";
import { Player } from "./Player";
import { Card } from "./Card";
import { DamageInstance } from "./DamageInstance";

import { Effect } from "../interfaces/Effect";

import { FactionSyndicate, SyndicateEffect } from "../types/enums";

import { DamageTypePerSyndicateEffect, FactionSyndicateToEffect } from "../constants/constants";

export class FactionSyndicateEffect implements Effect {
    private faction: FactionSyndicate;
    private effect: SyndicateEffect;

    public constructor(faction: FactionSyndicate) {
        this.faction = faction;

        this.effect = FactionSyndicateToEffect[this.faction];
    }

    public static init(faction: FactionSyndicate): FactionSyndicateEffect {
        return new FactionSyndicateEffect(faction);
    }

    public getFactionSyndicate(): FactionSyndicate {
        return this.faction;
    }

    public getSyndicateEffect(): SyndicateEffect {
        return this.effect;
    }

    public applyEffect(board: Board, by: 1 | 2) {
        (board[`getPlayer${by === 1 ? 2 : 1}`] as () => Player)()
            .getCards()
            .forEach((card: Card): void => {
                DamageInstance.init(
                    card,
                    this,
                    { [DamageTypePerSyndicateEffect[FactionSyndicateToEffect[this.getFactionSyndicate()]]]: 50 },
                    100,
                    0,
                    1,
                );
            });
    }
}
