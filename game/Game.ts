import { Board } from "../classes/Board";

export class Game {
    private board: Board;

    private turn: number = 0;

    public constructor(board: Board) {
        this.board = board;
    }

    public getBoard(): Board {
        return this.board;
    }

    public getTurn(): number {
        return this.turn;
    }

    public nextTurn(): void {
        // get cards that were played this turn and place them down
        this.getBoard().tick();
    }

    public playCard(player: 1 | 2, card: string): void {
        this.getBoard()
            [`getPlayer${player}`]()
            .getDeck()
            .getCards()
            .filter((uid: string): boolean => uid === card)[0];
    }

    protected endGame(): void {
        //
    }
}
