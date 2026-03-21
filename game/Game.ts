import { Board } from "../classes/Board";
import { Card } from "../classes/Card";

import { FocusSchool } from "../types/enums";

export class Game {
    private board: Board | null = null;

    private player1SocketID: string;
    private player2SocketID: string;

    private initialized: boolean;

    private turn: number = 0;

    // private iidCounter: number = 1;

    public constructor(player1SocketID: string, player2SocketID: string) {
        this.player1SocketID = player1SocketID;
        this.player2SocketID = player2SocketID;
        this.initialized = false;
    }

    public getPlayerSocketID(playerNumber: 1 | 2): string {
        return playerNumber === 1 ? this.player1SocketID : this.player2SocketID;
    }

    public init(board: Board) {
        this.board = board;
    }

    public getBoard(): Board | null {
        return this.board;
    }

    public getTurn(): number {
        return this.turn;
    }

    public nextTurn(): void {
        if (!this.initialized) return;

        this.turn++;

        // get cards that were played this turn and place them down
        this.getBoard()!.tick();

        //
    }

    public playCard(player: 1 | 2, cardIID: string): void {
        if (!this.initialized) return;

        this.getBoard()!
            [`getPlayer${player}`]()
            .getDeck()
            .getCards()
            .filter((card: Card): boolean => card.getIID() === cardIID)[0];
    }

    public createCardIID(__cardUID: string, __player: 1 | 2) {
        // TBA
        return "";
    }

    public focusAbility(_player: 1 | 2, _focusSchool: FocusSchool, _ability: 1 | 2 | 3): void {
        // TBA
    }

    protected endGame(): void {
        // TBA
    }
}
