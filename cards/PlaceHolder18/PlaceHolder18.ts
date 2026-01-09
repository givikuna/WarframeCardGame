import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder18: CardData = {
    ...{ name: "PlaceHolder18" },
    ...stats,
    ...{ abilities: abilities },
};
