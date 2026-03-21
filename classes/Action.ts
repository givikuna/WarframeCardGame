import { Board } from "./Board";
import { Player } from "./Player";
import { Card } from "./Card";

import { ActionFunction, TargetingFunction } from "../types/types";

import { ActionType } from "../types/enums";

export class Action {
    private name: string;
    private uid: string;
    private iid: string;
    private actionType: ActionType;
    private description: string;
    private actionFunction: ActionFunction;
    private targetingFunction: TargetingFunction;

    public constructor(
        name: string,
        uid: string,
        iid: string,
        actionType: ActionType,
        description: string,
        actionFunction: ActionFunction,
        targetingFunction: TargetingFunction = () => undefined,
    ) {
        this.name = name;
        this.uid = uid;
        this.iid = iid + uid;
        this.actionType = actionType;
        this.description = description;
        this.actionFunction = actionFunction;
        this.targetingFunction = targetingFunction;
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

    public getTargetingFunction(): TargetingFunction {
        return this.targetingFunction;
    }

    // -- // -- //

    public act(card: Card, player: Player, board: Board): void {
        this.actionFunction(this.targetingFunction, card, player, board, this.getActionType());
    }
}
