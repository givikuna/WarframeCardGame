import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder8: CardData = {
    ...{ name: "PlaceHolder8" },
    ...stats,
    ...{ abilities: abilities },
};
