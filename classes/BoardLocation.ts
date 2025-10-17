import { Board } from "./Board";
import { Card } from "./Card";

export class BoardLocation {
    protected player1: Card[] = [];
    protected player2: Card[] = [];
    protected board: Board;

    public constructor(board: Board) {
        this.board = board;
    }

    public getPlayerOneCards(): Card[] {
        return [...this.player1];
    }

    public getPlayerTwoCards(): Card[] {
        return [...this.player2];
    }

    public getAllCards(): Card[] {
        return [...this.player1, ...this.player2];
    }
}
