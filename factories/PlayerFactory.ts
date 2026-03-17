import { Board } from "../classes/Board";
import { Player } from "../classes/Player";
import { Operator } from "../classes/Operator";

import { PlayerAPI } from "../db/players/PlayerAPI";

import { DeckFactory } from "./DeckFactory";

import { IPlayerData } from "../interfaces/storage/IPlayerData";

import { defaultPlayerData } from "../constants/defaults";

export class PlayerFactory {
    public static manufacture(uid: string, playerNumber: 1 | 2, chosenDeck: 1 | 2 | 3, board: Board): Player {
        const playerData: IPlayerData = PlayerAPI.getPlayer(uid).getOrElse(defaultPlayerData);

        return new Player(
            playerData.name,
            playerNumber,
            uid,
            Operator.new(),
            DeckFactory.manufacture(playerData.decks[chosenDeck - 1], playerNumber, board),
        );
    }
}
