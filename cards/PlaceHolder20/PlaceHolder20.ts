import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder20: CardData = {
    ...{ name: "PlaceHolder20" },
    ...stats,
    ...{ abilities: abilities },
};
