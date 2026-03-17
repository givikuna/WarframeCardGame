import { Board } from "./Board";
import { Deck } from "./Deck";
import { Operator } from "./Operator";
import { Card } from "./Card";

export class Player {
    private playerName: string;
    private playerNumber: 1 | 2;
    private uid: string;
    private playedCards: Card[] = [];

    private operator: Operator;
    private deck: Deck;

    private damageDealt: number = 0;

    private credits: number = 200;

    public constructor(playerName: string, playerNumber: 1 | 2, uid: string, operator: Operator, deck: Deck) {
        this.playerName = playerName;
        this.playerNumber = playerNumber;
        this.uid = uid;
        this.operator = operator;
        this.deck = deck;
    }

    public getPlayerName(): string {
        return this.playerName;
    }

    public getPlayerNumber(): 1 | 2 {
        return this.playerNumber;
    }

    public getUID(): string {
        return this.uid;
    }

    public getOperator(): Operator {
        return this.operator;
    }

    public getDeck(): Deck {
        return this.deck;
    }

    public getCards(): ReadonlyArray<Card> {
        return [...this.playedCards];
    }

    public getCredits(): number {
        return this.credits;
    }

    public getDamageDealt(): number {
        return this.damageDealt;
    }

    public dealtDamage(x: number): void {
        const a: number = this.getDamageDealt();
        this.damageDealt += x;
        const b: number = this.getDamageDealt();

        if (a % 1000 !== b % 1000) {
            // apply syndicate effect
        }
    }

    public tick(board: Board): void {
        this.credits += 100;
        this.getCards().forEach((c: Card): void => c.tick(this, board));
    }
}
