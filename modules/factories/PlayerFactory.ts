import { Board } from "../../classes/Board";
import { Player } from "../../classes/Player";

export class PlayerFactory {
    public static async manufacture(playerNumber: 1 | 2, board: Board, ID: string, username: string): Promise<Player> {
        const deck: number[] = await PlayerFactory.fetchDeck(username);

        return new Player(playerNumber, deck, board, ID, username);
    }

    public static async fetchDeck(username: string): Promise<number[]> {
        const serverResponse: Response = await fetch(`localhost:3000/deck?username=${encodeURIComponent(username)}`, {
            method: "GET",
            headers: { Accept: "application/json" },
        });

        if (!serverResponse.ok) {
            throw new Error("Failed to fetch deck");
        }

        return serverResponse.json();
    }
}

// lots of issues here come back soon
