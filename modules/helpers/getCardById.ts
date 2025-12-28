import { cards } from "../../cards/cards";
import { CardData } from "../../types/types";

export function getCardById(id: number): CardData {
    return cards[id];
}
