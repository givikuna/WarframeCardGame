import * as _ from "underscore";

import { Stack } from "@givi-tsvariani/encodex/DataStructures/Stacks/Stack";

import { Card } from "./Card";
import { PlayerFaction } from "./PlayerFaction";

import { Cephalon, FactionSyndicate, FocusSchool } from "../types/enums";

export class Deck {
    private cards: Stack<Card>;
    private focusSchool: FocusSchool;
    private factionSyndicate: PlayerFaction;
    private cephalon: Cephalon;

    private hand: Card[] = [];

    public constructor(
        cards: Card[],
        focusSchool: FocusSchool,
        factionSyndicate: FactionSyndicate,
        cephalon: Cephalon,
    ) {
        this.cards = new Stack(_.shuffle(cards));
        this.focusSchool = focusSchool;
        this.factionSyndicate = new PlayerFaction(factionSyndicate);
        this.cephalon = cephalon;

        for (let i: number = 0; i < 6; i++) this.drawCard();
    }

    public getCards(): ReadonlyArray<Card> {
        return [...this.cards.toArray()];
    }

    public getHand(): ReadonlyArray<Card> {
        return [...this.hand];
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

    public drawCard(): void {
        if (this.cards.size() === 0) return;

        this.hand.push(this.cards.pop()!);
    }
}
