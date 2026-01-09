import { CardData } from "../../types/types";

import { cards } from "../../cards/cards";

export function getCardById(id: number): CardData {
    return cards[id];
}
