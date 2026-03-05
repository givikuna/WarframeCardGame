import { Card } from "./Card";

export class Player {
    private playerNumber: 1 | 2;
    private uid: string;
    private playedCards: Card[] = [];

    public constructor(playerNumber: 1 | 2, uid: string) {
        this.playerNumber = playerNumber;
        this.uid = uid;
    }

    public getPlayerNumber(): 1 | 2 {
        return this.playerNumber;
    }

    public getUID(): string {
        return this.uid;
    }

    public getCards(): ReadonlyArray<Card> {
        return [...this.playedCards];
    }
}
