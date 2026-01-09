import { CardData } from "../../types/types";

import { abilities } from "./abilities";
import { stats } from "./stats";

export const Banshee: CardData = {
    ...{ name: "Banshee" },
    ...stats,
    ...{ abilities: abilities },
};
