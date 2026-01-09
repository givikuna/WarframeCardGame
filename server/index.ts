import * as http from "http";
import * as path from "path";

import express from "express";

import metaRouter from "./routes/meta";

import { fileURLToPath } from "url";

import { DefaultEventsMap, Server } from "socket.io";
import { setupSocket } from "./socket";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const app: express.Application = express();
const server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> = http.createServer(app);
const io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> = new Server(server);

app.use(express.json());

app.use("/api", metaRouter);

app.use(express.static(path.join(__dirname, "../public")));

setupSocket(io);

app.get(/(.*)/, (_req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT: Readonly<number> = 3000;
server.listen(PORT, (): void => {
    console.log(`Server running on http://localhost:${PORT}`);
});
