import { ICardData } from "./ICardData";

export interface IDeckData {
    uid: string;
    cards: ICardData;
    focusSchool: string;
    factionSyndicate: string;
    cephalon: string;
}
