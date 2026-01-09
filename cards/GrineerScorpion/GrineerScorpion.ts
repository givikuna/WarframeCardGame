import { CardData } from "../../types/types";
import { abilities } from "./abilities";
import { stats } from "./stats";

export const GrineerScorpion: CardData = {
    ...{ name: "Grineer Scorpion" },
    ...stats,
    ...{ abilities: abilities },
};
