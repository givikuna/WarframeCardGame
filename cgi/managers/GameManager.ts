import { Game } from "../../game/Game";

export class GameManager {
    private activeMatches: Map<string, Game> = new Map();
    private playerToMatch: Map<string, string> = new Map();

    public createMatch(p1SocketID: string, p2SocketID: string): void {
        const matchID: string = `match_${Date.now()}`;

        // create a board
        // then create a game
        // add the game into active matches
        // map sockets ids to player ids
    }

    /*
    public getMatchBySocket(socketID: string): Game | undefined {
        // ...
    }
        */
}
