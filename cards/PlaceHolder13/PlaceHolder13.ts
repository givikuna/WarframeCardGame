import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder13: CardData = {
    ...{ name: "PlaceHolder13" },
    ...stats,
    ...{ abilities: abilities },
};
