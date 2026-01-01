import { Board } from "../classes/Board";
import { Player } from "../classes/Player";

import { TurnData } from "../types/types";

export class Game {
    private player1: Player;
    private player2: Player;
    private board: Board;

    private c: boolean = true;

    private turn: number = 0;

    public constructor(player1: Player, player2: Player, board: Board) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = board;
    }

    public getPlayer1(): Player {
        return this.player1;
    }

    public getPlayer2(): Player {
        return this.player2;
    }

    public getBoard(): Board {
        return this.board;
    }

    public getTurn(): number {
        return this.turn;
    }

    private firstPlayer(): 1 | 2 {
        if (this.c) {
            this.c = false;
            return 1;
        } else {
            this.c = true;
            return 2;
        }
    }

    private nextTurnData(): TurnData {
        return { firstPlayer: this.firstPlayer(), turn: this.turn++ };
    }

    public nextTurn(): TurnData {
        const nextTurnData: TurnData = this.nextTurnData();
        // logic to let (nextTurnData.firstPlayer) play cards
        // logic to let (nextTurnData.firstPlayer === 1 ? 0 : 1) play cards

        return nextTurnData;
    }
}
