import { Cephalon, FactionSyndicate, FocusSchool } from "../types/enums";

export class Deck {
    private cards: string[];
    private focusSchool: FocusSchool;
    private factionSyndicate: FactionSyndicate;
    private cephalon: Cephalon;

    public constructor(
        cards: string[],
        focusSchool: FocusSchool,
        factionSyndicate: FactionSyndicate,
        cephalon: Cephalon,
    ) {
        this.cards = cards;
        this.focusSchool = focusSchool;
        this.factionSyndicate = factionSyndicate;
        this.cephalon = cephalon;
    }

    public getCards(): ReadonlyArray<string> {
        return [...this.cards].map(String);
    }

    public getFocusSchool(): FocusSchool {
        return this.focusSchool;
    }

    public getFaction(): FactionSyndicate {
        return this.factionSyndicate;
    }

    public getCephalon(): Cephalon {
        return this.cephalon;
    }
}
