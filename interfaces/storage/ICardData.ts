import { ICard } from "../ICard";

export interface ICardData extends Omit<ICard, "actions"> {
    actions: string[];
}
