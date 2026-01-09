import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder1: CardData = {
    ...{ name: "PlaceHolder1" },
    ...stats,
    ...{ abilities: abilities },
};
