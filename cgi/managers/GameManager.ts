import { Game } from "../../game/Game";
import { Board } from "../../classes/Board";

import { ConnectionManager } from "./ConnectionManager";

import { BoardFactory } from "../../factories/BoardFactory";

import { defaultPlayerID } from "../../constants/defaults";

import { noop } from "underscore";

export class GameManager {
    private activeMatches: Map<string, Game> = new Map();
    private playerToMatch: Map<string, string> = new Map();

    public constructor() {
        noop();
    }

    public static init(): GameManager {
        return new GameManager();
    }

    public createMatch(p1SocketID: string, p2SocketID: string, cm: ConnectionManager): Game {
        const matchID: string = `match_${Date.now()}`;

        const game: Game = new Game(p1SocketID, p2SocketID);

        const p1UID: string = cm.getUIDFromSocket(p1SocketID).getOrElse(defaultPlayerID);
        const p2UID: string = cm.getUIDFromSocket(p2SocketID).getOrElse(defaultPlayerID);

        const board: Board = BoardFactory.manufacture(p1UID, p2UID, game);

        game.init(board);

        this.activeMatches.set(matchID, game);
        this.playerToMatch.set(p1SocketID, matchID);
        this.playerToMatch.set(p2SocketID, matchID);

        return game;
    }

    public getMatchBySocket(socketID: string): Game | undefined {
        if (
            !this.activeMatches
                .entries()
                .toArray()
                .map((x: [string, Game]): string => x[0])
                .includes(socketID)
        )
            return;

        return this.activeMatches.get(socketID);
    }

    public getMatchByPlayer(playerID: string): Game | undefined {
        if (
            !this.playerToMatch
                .entries()
                .toArray()
                .map((x: [string, string]): string => x[0])
                .includes(playerID)
        )
            return;

        return this.activeMatches
            .entries()
            .toArray()
            .filter(
                (x: [string, Game]): boolean =>
                    x[1].getPlayerSocketID(1) === playerID || x[1].getPlayerSocketID(2) === playerID,
            )
            .at(0)!
            .at(1) as Game;
    }

    public handleDisconnectAndCleanup(socketID: string): string | undefined {
        const matchID: string | undefined = this.playerToMatch.get(socketID);

        if (!matchID) return undefined;

        const match: Game | undefined = this.activeMatches.get(matchID);

        if (!match) return undefined;

        //

        const p1Socket: string = match.getPlayerSocketID(1);
        const p2Socket: string = match.getPlayerSocketID(2);
        const opponentSocketID: string = p1Socket === socketID ? p2Socket : p1Socket;

        this.activeMatches.delete(matchID);
        this.playerToMatch.delete(p1Socket);
        this.playerToMatch.delete(p2Socket);

        return opponentSocketID;
    }
}
