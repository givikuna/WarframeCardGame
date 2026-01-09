import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder6: CardData = {
    ...{ name: "PlaceHolder6" },
    ...stats,
    ...{ abilities: abilities },
};
