import { Game } from "../game/Game";
import { Player } from "../classes/Player";
import { Operator } from "../classes/Operator";

import { PlayerAPI } from "../db/players/PlayerAPI";

import { DeckFactory } from "./DeckFactory";

import { defaultPlayerData } from "../constants/defaults";

export class PlayerFactory {
    public static manufacture(uid: string, playerNumber: 1 | 2, chosenDeck: 1 | 2 | 3, game: Game): Player {
        return new Player(
            playerNumber,
            uid,
            Operator.new(),
            DeckFactory.manufacture(
                PlayerAPI.getPlayer(uid).getOrElse(defaultPlayerData).decks[chosenDeck - 1],
                playerNumber,
                game,
            ),
        );
    }
}
