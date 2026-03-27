import { GameManager } from "./GameManager";
import { ConnectionManager } from "./ConnectionManager";

import { Queue } from "@givi-tsvariani/encodex/DataStructures/Queues/Queue";

import { noop } from "underscore";

export class LobbyManager {
    private queue: Queue<string> = new Queue();

    public constructor() {
        noop();
    }

    public static init(): LobbyManager {
        return new LobbyManager();
    }

    public joinQueue(socketID: string, gm: GameManager, cm: ConnectionManager): void {
        this.queue.enqueue(socketID);
        this.checkForMatch(gm, cm);
    }

    public removeFromQueue(socketID: string): void {
        const currentQueue: string[] = this.queue.toArray();

        if (currentQueue.includes(socketID)) {
            this.queue = new Queue<string>();

            currentQueue
                .filter((id: string): boolean => id !== socketID)
                .forEach((id: string): void => this.queue.enqueue(id));
        }
    }

    private checkForMatch(gm: GameManager, cm: ConnectionManager) {
        if (this.queue.size() >= 2) {
            const player1SocketID: string = this.queue.dequeue()!;
            const player2SocketID: string = this.queue.dequeue()!;

            gm.createMatch(player1SocketID, player2SocketID, cm);
        }
    }
}
