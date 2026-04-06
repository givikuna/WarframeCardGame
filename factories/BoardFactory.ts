import { Board } from "../classes/Board";
import { Game } from "../game/Game";

import { PlayerFactory } from "./PlayerFactory";

export class BoardFactory {
    public static manufacture(player1: string, player2: string, game: Game): Board {
        return new Board(
            PlayerFactory.manufacture(player1, 1, 1, game),
            PlayerFactory.manufacture(player2, 2, 1, game),
            game.getEventManager(),
        );
    }
}
