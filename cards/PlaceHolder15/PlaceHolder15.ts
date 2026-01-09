import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder15: CardData = {
    ...{ name: "PlaceHolder15" },
    ...stats,
    ...{ abilities: abilities },
};
