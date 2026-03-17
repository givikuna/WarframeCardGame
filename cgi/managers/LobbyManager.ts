import { Queue } from "@givi-tsvariani/encodex/DataStructures/Queues/Queue";

export class LobbyManager {
    private queue: Queue<string> = new Queue();

    public joinQueue(socketID: string): void {
        this.queue.enqueue(socketID);
        this.checkForMatch();
    }

    private checkForMatch() {
        if (this.queue.size() >= 2) {
            const player1ID: string = this.queue.dequeue()!;
            const player2ID: string = this.queue.dequeue()!;

            //
        }
    }
}
