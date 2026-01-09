import * as _ from "underscore";

import { Board } from "./Board";

import { CardFactory } from "../modules/factories/CardFactory";

import { getCardById } from "../modules/helpers/getCardById";

export class Player {
    private playerNumber: 1 | 2;
    private hand: number[];
    private deck: ReadonlyArray<number>;
    private board: Board;
    private ID: string;
    private username: string;

    public constructor(playerNumber: 1 | 2, deck: number[], board: Board, id: string, username: string) {
        this.playerNumber = playerNumber;
        this.deck = _.shuffle([...deck]);
        this.hand = [this.deck[0], this.deck[1], this.deck[2], this.deck[3], this.deck[4]];
        this.board = board;
        this.ID = id;
        this.username = username;
    }

    public getUsername(): string {
        return this.username;
    }

    public getID(): string {
        return this.ID;
    }

    public getPlayerNumber(): 1 | 2 {
        return this.playerNumber;
    }

    public getDeck(): number[] {
        return [...this.deck];
    }

    public getHand(): number[] {
        return [...this.hand];
    }

    public drawCards(count: number): void {
        for (let i = 0; i < count; i++) {
            if (this.deck.length > 0) {
                const cardId = this.deck[0];
                const mutableDeck = this.deck as number[];
                mutableDeck.shift();

                this.hand.push(cardId);
            }
        }
    }

    public playCard(locationInHand: number, playedLocation: 1 | 2 | 3): void {
        const cardId = this.hand[locationInHand];
        if (!cardId) return;

        this.board
            .getLocations()
            [playedLocation - 1].playCard(
                CardFactory.manufacture(getCardById(cardId), this.getPlayerNumber(), this.board, playedLocation),
            );

        this.hand.splice(locationInHand, 1);
    }
}
