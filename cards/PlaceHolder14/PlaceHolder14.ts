import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder14: CardData = {
    ...{ name: "PlaceHolder14" },
    ...stats,
    ...{ abilities: abilities },
};
