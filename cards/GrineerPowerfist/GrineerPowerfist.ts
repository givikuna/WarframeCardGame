import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const GrineerPowerfist: CardData = {
    ...{ name: "Grineer Powerfist" },
    ...stats,
    ...{ abilities: abilities },
};
