import { CardDTO } from "./protocol";

import { CardActionData } from "../types/types";

export interface ICard extends CardDTO {
    cardClass: string;

    faction: string;
    healthClass: string;
    rarity: string;

    actions: CardActionData[];
}
