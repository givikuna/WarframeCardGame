import { EventManager } from "./events/EventManager";

import { Board } from "../classes/Board";
import { Card } from "../classes/Card";
import { togglePlayerNumber } from "../modules/togglePlayerNumber";

import { FocusSchool } from "../types/enums";
import { Player } from "../classes/Player";

export class Game {
    private board: Board | null = null;

    private player1SocketID: string;
    private player2SocketID: string;

    private initialized: boolean;

    private turn: number = 0;

    private priority: 1 | 2 = 2;

    private em: EventManager;

    // private iidCounter: number = 1;

    public constructor(player1SocketID: string, player2SocketID: string) {
        this.player1SocketID = player1SocketID;
        this.player2SocketID = player2SocketID;
        this.initialized = false;

        this.em = EventManager.init();
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

    public getPriority(): 1 | 2 {
        return this.priority;
    }

    public getEventManager(): EventManager {
        return this.em;
    }

    public nextTurn(): void {
        if (!this.initialized) return;

        this.turn++;
        this.togglePriority();

        this.em.emit("TURN_STARTED", { turnNumber: this.getTurn(), priorityPlayer: this.getPriority() });

        this.getBoard()!.tick(this.getPriority(), this.creditsForTurn());
    }

    public creditsForTurn(): number {
        return 100;
    }

    public playCard(player: 1 | 2, cardIID: string): void {
        if (!this.initialized) return;

        const cardToPlay: Card = this.getBoard()!
            [`getPlayer${player}`]()
            .getDeck()
            .getCards()
            .filter((card: Card): boolean => card.getIID() === cardIID)[0];

        this.board![`getPlayer${player}`]().playCard(cardToPlay);

        this.em.emit("CARD_PLAYED", { player: this.board![`getPlayer${player}`](), card: cardToPlay });
    }

    public createCardIID(__cardUID: string, __player: 1 | 2) {
        // TBA
        return "";
    }

    public focusAbility(_player: 1 | 2, _focusSchool: FocusSchool): void {
        const p: Player = this.board![`getPlayer${_player}`]();
        this.em.emit("FOCUS_ABILITY_ACTIVATED", { player: p, focusSchool: p.getDeck().getFocusSchool() });
    }

    protected endGame(): void {
        // TBA
    }

    protected togglePriority(): void {
        this.priority = togglePlayerNumber(this.priority);
    }
}
