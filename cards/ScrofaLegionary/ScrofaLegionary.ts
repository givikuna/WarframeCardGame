import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const ScrofaLegionary: CardData = {
    ...{ name: "Scrofa Legionary" },
    ...stats,
    ...{ abilities: abilities },
};
