import { Player } from "../classes/Player";
import { Card } from "../classes/Card";

import { cards } from "../db/cards/cards";

export class CardFactory {
    public static manufacture(cardID: string, iid: string, owner: Player): Card {
        return new Card(cards[cardID], iid, owner.getPlayerNumber());
    }
}
