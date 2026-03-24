import { Board } from "../../../classes/Board";
import { Player } from "../../../classes/Player";
import { Operator } from "../../../classes/Operator";
import { Card } from "../../../classes/Card";

import { TargetingFunction } from "../../../types/types";

export const targetOperator: TargetingFunction = (_card: Card, player: Player, _board: Board): Operator =>
    player.getOperator();
