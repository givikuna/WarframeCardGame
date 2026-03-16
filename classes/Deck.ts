import { Card } from "./Card";

import { PlayerFaction } from "./PlayerFaction";

import { Cephalon, FactionSyndicate, FocusSchool } from "../types/enums";

export class Deck {
    private cards: Card[];
    private focusSchool: FocusSchool;
    private factionSyndicate: PlayerFaction;
    private cephalon: Cephalon;

    public constructor(
        cards: Card[],
        focusSchool: FocusSchool,
        factionSyndicate: FactionSyndicate,
        cephalon: Cephalon,
    ) {
        this.cards = cards;
        this.focusSchool = focusSchool;
        this.factionSyndicate = new PlayerFaction(factionSyndicate);
        this.cephalon = cephalon;
    }

    public getCards(): ReadonlyArray<Card> {
        return [...this.cards];
    }

    public getFocusSchool(): FocusSchool {
        return this.focusSchool;
    }

    public getFaction(): PlayerFaction {
        return this.factionSyndicate;
    }

    public getCephalon(): Cephalon {
        return this.cephalon;
    }
}
