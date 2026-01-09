import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder2: CardData = {
    ...{ name: "PlaceHolder2" },
    ...stats,
    ...{ abilities: abilities },
};
