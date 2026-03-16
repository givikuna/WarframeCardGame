import { Maybe } from "@givi-tsvariani/encodex/Monads/Maybe";

import { IDeckData } from "../storage/IDeckData";

export interface IDeckAPI {
    getDecks(): Record<string, IDeckData>;
    getDeck(uid: string): Maybe<IDeckData>;
}
