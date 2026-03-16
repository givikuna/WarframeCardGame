import { IDeckData } from "../interfaces/storage/IDeckData";
import { IPlayerData } from "../interfaces/storage/IPlayerData";

export const defaultDeckData: IDeckData = {
    uid: "DA0000001",
    cards: [],
    focusSchool: "Zenurik",
    factionSyndicate: "ArbitersOfHexis",
    cephalon: "Ordis",
};

export const defaultPlayerData: IPlayerData = {
    uid: "PA00001",
    decks: ["DA0000001", "DA0000002", "DA0000002"],
};
