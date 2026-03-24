import { ICard } from "../../interfaces/ICard";

import { Excalibur } from "./cards/Excalibur";
import { Nakak } from "./cards/Nakak";
import { Charger } from "./cards/Charger";
import { DeimosCharger } from "./cards/DeimosCharger";

export const cards: { [uid: string]: ICard } = {
    CEX001: Excalibur,
    CNA001: Nakak,
    CDE001: DeimosCharger,
    CCH001: Charger,
};
