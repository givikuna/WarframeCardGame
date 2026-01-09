import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder9: CardData = {
    ...{ name: "PlaceHolder9" },
    ...stats,
    ...{ abilities: abilities },
};
