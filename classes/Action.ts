import { Board } from "./Board";
import { Player } from "./Player";

import { ActionFunction } from "../types/types";

import { ActionType } from "../types/enums";

export class Action {
    private name: string;
    private uid: string;
    private iid: string;
    private actionType: ActionType;
    private description: string;
    private actionFunction: ActionFunction;

    public constructor(
        name: string,
        uid: string,
        iid: string,
        actionType: ActionType,
        description: string,
        actionFunction: ActionFunction,
    ) {
        this.name = name;
        this.uid = uid;
        this.iid = iid;
        this.actionType = actionType;
        this.description = description;
        this.actionFunction = actionFunction;
    }

    public getName(): string {
        return this.name;
    }

    public getUID(): string {
        return this.uid;
    }

    public getIID(): string {
        return this.iid;
    }

    public getActionType(): ActionType {
        return this.actionType;
    }

    public getDescription(): string {
        return this.description;
    }

    // -- // -- //

    public act(player: Player, board: Board): void {
        this.actionFunction(player, board, this.getActionType());
    }
}
