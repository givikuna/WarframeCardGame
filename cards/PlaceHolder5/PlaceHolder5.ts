import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder5: CardData = {
    ...{ name: "PlaceHolder5" },
    ...stats,
    ...{ abilities: abilities },
};
