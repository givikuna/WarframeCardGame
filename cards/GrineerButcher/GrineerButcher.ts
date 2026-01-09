import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const GrineerButcher: CardData = {
    ...{ name: "Grineer Butcher" },
    ...stats,
    ...{ abilities: abilities },
};
