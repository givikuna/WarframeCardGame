import * as _ from "underscore";
import { Board } from "./Board";
import { CardFactory } from "../modules/factories/CardFactory/CardFactory";
import { getCardById } from "../modules/helpers/getCardById";

export class Player {
    private playerNumber: 1 | 2;
    private hand: number[];
    private deck: ReadonlyArray<number>;
    private board: Board;

    public constructor(playerNumber: 1 | 2, deck: number[], board: Board) {
        this.playerNumber = playerNumber;
        this.deck = _.shuffle([...deck]);
        this.hand = [this.deck[0], this.deck[1], this.deck[2], this.deck[3], this.deck[4]];
        this.board = board;
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

    public playCard(locationInHand: number, playedLocation: 1 | 2 | 3): void {
        this.board
            .getLocations()
            [playedLocation - 1].playCard(
                CardFactory.manufacture(
                    getCardById(this.hand[locationInHand]),
                    this.getPlayerNumber(),
                    this.board,
                    playedLocation,
                ),
            );

        //

        this.hand.splice(locationInHand, 1);
    }
}
