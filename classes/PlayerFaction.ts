import { Board } from "./Board";
import { FactionSyndicateEffect } from "./FactionSyndicateEffect";

import { FactionSyndicate } from "../types/enums";

export class PlayerFaction {
    private faction: FactionSyndicate;
    private effect: FactionSyndicateEffect;

    public constructor(faction: FactionSyndicate) {
        this.faction = faction;

        this.effect = new FactionSyndicateEffect(faction);
    }

    public static init(faction: FactionSyndicate): PlayerFaction {
        return new PlayerFaction(faction);
    }

    public getFaction(): FactionSyndicate {
        return this.faction;
    }

    public getEffect(): FactionSyndicateEffect {
        return this.effect;
    }

    public syndicateEffect(board: Board, player: 1 | 2): void {
        this.getEffect().applyEffect(board, player);
    }
}
