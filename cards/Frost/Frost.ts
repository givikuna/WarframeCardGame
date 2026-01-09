import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const Frost: CardData = {
    ...{ name: "Frost" },
    ...stats,
    ...{ abilities: abilities },
};
