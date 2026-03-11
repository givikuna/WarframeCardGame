import { CardDTO } from "./protocol";

import { CardActionData } from "../types/types";

export interface ICard extends CardDTO {
    healthClass: string;
    cardClass: string;
    faction: string;
    rarity: string;

    actions: CardActionData[];
}
