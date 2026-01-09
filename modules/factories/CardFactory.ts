import { Ability } from "../../classes/Ability";
import { Board } from "../../classes/Board";
import { Card } from "../../classes/Card";
import { CardData } from "../../types/types";

export class CardFactory {
    public static manufacture(cardData: CardData, cardOwner: 1 | 2, board: Board, locationOnBoard: number): Card {
        return new Card(
            cardData.name,
            cardData.faction,
            cardData.healthType,
            cardData.maxHealth,
            cardData.maxShields,
            cardData.baseArmor,
            cardData.maxOverguard,
            cardData.startingEnergy,
            cardData.maxEnergy,
            cardData.abilities as Ability[],
            board,
            locationOnBoard,
            cardOwner,
        );
    }
}
