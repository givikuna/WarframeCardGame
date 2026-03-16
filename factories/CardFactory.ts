import { Card } from "../classes/Card";

import { cards } from "../db/cards/cards";

export class CardFactory {
    public static manufacture(cardID: string, iid: string, owner: 1 | 2): Card {
        return new Card(cards[cardID], iid, owner);
    }
}
