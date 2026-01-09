import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const ProdCrewman: CardData = {
    ...{ name: "Prod Crewman" },
    ...stats,
    ...{ abilities: abilities },
};
