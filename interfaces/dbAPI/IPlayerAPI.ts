import { Maybe } from "@givi-tsvariani/encodex/Monads/Maybe";

import { IPlayerData } from "../storage/IPlayerData";

export interface IPlayerAPI {
    getPlayers(): Record<string, IPlayerData>;
    getPlayer(uid: string): Maybe<IPlayerData>;
}
