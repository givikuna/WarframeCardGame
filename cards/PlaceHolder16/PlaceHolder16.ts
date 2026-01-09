import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const PlaceHolder16: CardData = {
    ...{ name: "PlaceHolder16" },
    ...stats,
    ...{ abilities: abilities },
};
