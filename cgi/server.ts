import * as express from "express";
import * as http from "http";
import * as socket_io from "socket.io";

const app: express.Application = express.default();
const httpServer: http.Server = http.createServer(app);
const io: socket_io.Server = new socket_io.Server(httpServer, {});

const PORT: 8080 = 8080;

io.on(
    "connection",
    (
        socket: socket_io.Socket<
            socket_io.DefaultEventsMap,
            socket_io.DefaultEventsMap,
            socket_io.DefaultEventsMap,
            any
        >,
    ) => {
        console.log(`User connected: ${socket.id}`);
    },
);

httpServer.listen(PORT, (): void => {
    console.log(`Ordis is online and listening on port ${PORT}`);
});
