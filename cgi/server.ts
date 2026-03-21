import * as express from "express";
import * as http from "http";
import * as socket_io from "socket.io";

import { GameServer } from "./servers/GameServer";

const app: express.Application = express.default();
const httpServer: http.Server = http.createServer(app);
const io: socket_io.Server = new socket_io.Server(httpServer, {});

const PORT: number = 8080;

const gameServer = new GameServer(io);
gameServer.startListening();

httpServer.listen(PORT, (): void => {
    console.log(`Ordis is online and listening on port ${PORT}`);
});
