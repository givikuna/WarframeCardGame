import { CardData } from "../../types/types";

import { abilities } from "./abilities";
import { stats } from "./stats";

export const Excalibur: CardData = {
    ...{ name: "Excalibur" },
    ...stats,
    ...{ abilities: abilities },
};
