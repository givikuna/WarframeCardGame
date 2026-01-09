import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder10: CardData = {
    ...{ name: "PlaceHolder10" },
    ...stats,
    ...{ abilities: abilities },
};
