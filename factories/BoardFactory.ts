import { Board } from "../classes/Board";

import { PlayerFactory } from "./PlayerFactory";

export class BoardFactory {
    public static manufacture(player1: string, player2: string, board: Board): Board {
        return new Board(
            PlayerFactory.manufacture(player1, 1, 1, board),
            PlayerFactory.manufacture(player2, 2, 1, board),
        );
    }
}
