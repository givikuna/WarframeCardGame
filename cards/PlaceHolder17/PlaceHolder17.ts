import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder17: CardData = {
    ...{ name: "PlaceHolder17" },
    ...stats,
    ...{ abilities: abilities },
};
