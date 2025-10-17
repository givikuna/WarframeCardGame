import { BoardLocation } from "./BoardLocation";
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
}
