import * as SocketIO from "socket.io";
import * as _ from "underscore";

import { LobbyManager } from "../managers/LobbyManager";
import { GameManager } from "../managers/GameManager";
import { ConnectionManager } from "../managers/ConnectionManager";

export class GameServer {
    private lm: LobbyManager;
    private gm: GameManager;
    private cm: ConnectionManager;
    private io: SocketIO.Server;

    private waitingPlayerSocketID: string | null = null;

    public constructor(io: SocketIO.Server) {
        this.lm = LobbyManager.init();
        this.gm = GameManager.init();
        this.cm = ConnectionManager.init();

        this.io = io;
    }

    public startListening(): void {
        this.io.on(
            "connection",
            (
                socket: SocketIO.Socket<
                    SocketIO.DefaultEventsMap,
                    SocketIO.DefaultEventsMap,
                    SocketIO.DefaultEventsMap,
                    any
                >,
            ): void => {
                const uid: string | undefined = socket.handshake.auth["uid"];

                if (!uid) {
                    console.error(`Rejected Connection: NO UID provided for Socket ${socket.id}`);
                    socket.disconnect();
                    return;
                }

                console.log(`Player connected as: ${socket.id}`);

                this.getConnectionManager().registerSocket(socket.id, uid);

                if (this.waitingPlayerSocketID === null) {
                    this.waitingPlayerSocketID = socket.id;
                }

                this.getLobbyManager().joinQueue(
                    this.waitingPlayerSocketID,
                    this.getGameManager(),
                    this.getConnectionManager(),
                );

                this.waitingPlayerSocketID = null;

                socket.on("disconnect", (): void => {
                    console.log(`Player ${uid} disconnected`);

                    this.cm.removeSocket(socket.id);
                    this.lm.removeFromQueue(socket.id);

                    const opponentSocketID: string | undefined = this.gm.handleDisconnectAndCleanup(socket.id);

                    if (opponentSocketID) {
                        this.io.to(opponentSocketID).emit("opponentDisconnected", {
                            message: "Your opponent has disconnected :(",
                        });
                    }
                });
            },
        );
    }

    public getLobbyManager(): LobbyManager {
        return this.lm;
    }

    public getGameManager(): GameManager {
        return this.gm;
    }

    public getConnectionManager(): ConnectionManager {
        return this.cm;
    }

    public getIO(): SocketIO.Server {
        return this.io;
    }
}
