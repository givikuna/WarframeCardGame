import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder3: CardData = {
    ...{ name: "PlaceHolder3" },
    ...stats,
    ...{ abilities: abilities },
};
