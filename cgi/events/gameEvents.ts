import * as socketIO from "socket.io";

import { GameManager } from "../managers/GameManager";

export const registerGameEvents: (socket: socketIO.Socket, io: socketIO.Server, gameManager: GameManager) => void = (
    socket: socketIO.Socket,
    io: socketIO.Server,
    gameManager: GameManager,
): void => {
    socket.on("playCard", (payload: { cardID: string }): void => {
        // const game: Game = gameManager.getMatchBySocket(socket.id);
        // if (!game) return;

        // const playerNumber: number = ...
        // game.playCard...
        // broadcast the updated state
        // io.to(matchID).emit("gameStateUpdated", game.getBoardStateDTO());

        socket.on("endTurn", (): void => {
            // trigger ticks and broadcast
        });
    });
};
