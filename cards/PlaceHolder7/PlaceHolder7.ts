import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder7: CardData = {
    ...{ name: "PlaceHolder7" },
    ...stats,
    ...{ abilities: abilities },
};
