import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder12: CardData = {
    ...{ name: "PlaceHolder12" },
    ...stats,
    ...{ abilities: abilities },
};
