import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder4: CardData = {
    ...{ name: "PlaceHolder4" },
    ...stats,
    ...{ abilities: abilities },
};
