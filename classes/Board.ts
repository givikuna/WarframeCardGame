import { BoardLocation } from "./BoardLocation";
import { Card } from "./Card";
export class Board {
    protected locations: [BoardLocation, BoardLocation, BoardLocation];

    public constructor(
        locations?:
            | [BoardLocation]
            | [BoardLocation, BoardLocation]
            | [BoardLocation, BoardLocation, BoardLocation],
    ) {
        this.locations =
            locations == null || locations == undefined
                ? [new BoardLocation(this), new BoardLocation(this), new BoardLocation(this)]
                : locations.length === 3
                ? locations
                : locations.length === 2
                ? [...locations, new BoardLocation(this)]
                : [...locations, new BoardLocation(this), new BoardLocation(this)];
    }

    public getLocations(): [BoardLocation, BoardLocation, BoardLocation] {
        return this.locations;
    }

    public getAllCards(): ReadonlyArray<Card> {
        return [
            ...this.getLocations()[0].getAllCards(),
            ...this.getLocations()[1].getAllCards(),
            ...this.getLocations()[2].getAllCards(),
        ];
    }

    public nextTurn(): void {
        this.getAllCards().forEach((card: Card): void => {
            card.nextTurn();
        });
    }
}
