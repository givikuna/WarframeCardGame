import * as fs from "fs";

import { Maybe } from "@givi-tsvariani/encodex/Monads/Maybe";

import { IDeckAPI } from "../../interfaces/dbAPI/IDeckAPI";
import { IDeckData } from "../../interfaces/storage/IDeckData";

export const DeckAPI: IDeckAPI = {
    getDecks: (): Record<string, IDeckData> =>
        JSON.parse(fs.readFileSync("./decks.json", "utf-8")) as Record<string, IDeckData>,
    getDeck: (uid: string): Maybe<IDeckData> => Maybe.of(DeckAPI.getDecks()[uid]),
};
