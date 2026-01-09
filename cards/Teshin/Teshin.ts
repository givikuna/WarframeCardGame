import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const Teshin: CardData = {
    ...{ name: "Teshin" },
    ...stats,
    ...{ abilities: abilities },
};
