import { Board } from "./Board";
import { Player } from "./Player";
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

    public applySyndicateEffect(board: Board, player: Player): void {
        this.getEffect().applyEffect(board, player);
    }
}
