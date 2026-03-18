import { Deck } from "../classes/Deck";
import { Card } from "../classes/Card";

import { DeckAPI } from "../db/decks/DeckAPI";

import { IDeckData } from "../interfaces/storage/IDeckData";
import { CardFactory } from "./CardFactory";

import { FocusSchool, FactionSyndicate, Cephalon } from "../types/enums";

import { defaultDeckData } from "../constants/defaults";
import { Game } from "../game/Game";

export class DeckFactory {
    public static manufacture(uid: string, playerNumber: 1 | 2, game: Game): Deck {
        const deck: IDeckData = DeckAPI.getDeck(uid).getOrElse(defaultDeckData);

        return new Deck(
            deck.cards.map(
                (cardUID: string): Card =>
                    CardFactory.manufacture(cardUID, game.createCardIID(uid, playerNumber), playerNumber),
            ),
            FocusSchool[deck.focusSchool],
            FactionSyndicate[deck.factionSyndicate],
            Cephalon[deck.cephalon],
        );
    }
}
