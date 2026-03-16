import * as fs from "fs";

import { Maybe } from "@givi-tsvariani/encodex/Monads/Maybe";

import { IPlayerAPI } from "../../interfaces/dbAPI/IPlayerAPI";
import { IPlayerData } from "../../interfaces/storage/IPlayerData";

export const PlayerAPI: IPlayerAPI = {
    getPlayers: (): Record<string, IPlayerData> =>
        JSON.parse(fs.readFileSync("./players.json", "utf-8")) as Record<string, IPlayerData>,
    getPlayer: (uid: string): Maybe<IPlayerData> => Maybe.of(PlayerAPI.getPlayers()[uid]),
};
