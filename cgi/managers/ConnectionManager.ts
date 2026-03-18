import { Maybe } from "@givi-tsvariani/encodex/Monads/Maybe";

import { noop } from "underscore";

export class ConnectionManager {
    private socketToUID: Map<string, string> = new Map();

    public constructor() {
        noop();
    }

    public static init(): ConnectionManager {
        return new ConnectionManager();
    }

    public registerSocket(socketID: string, uid: string): void {
        this.socketToUID.set(socketID, uid);
    }

    public removeSocket(socketID: string): void {
        this.socketToUID.delete(socketID);
    }

    public getUIDFromSocket(socketID: string): Maybe<string> {
        return this.socketToUID[socketID];
    }
}
