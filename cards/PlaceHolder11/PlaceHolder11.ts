import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder11: CardData = {
    ...{ name: "PlaceHolder11" },
    ...stats,
    ...{ abilities: abilities },
};
