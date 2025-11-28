import { Board } from "./Board";
import { Card } from "./Card";

export class BoardLocation {
    protected player1: Card[] = [];
    protected player2: Card[] = [];
    protected board: Board;

    public constructor(board: Board) {
        this.board = board;
    }

    public playCard(card: Card): void {
        if (card.getPlayer() === 1) {
            this.player1.push(card);
        } else {
            this.player2.push(card);
        }
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
