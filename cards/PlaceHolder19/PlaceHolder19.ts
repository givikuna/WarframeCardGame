import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder19: CardData = {
    ...{ name: "PlaceHolder19" },
    ...stats,
    ...{ abilities: abilities },
};
