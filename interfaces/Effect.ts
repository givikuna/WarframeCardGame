import { Board } from "../classes/Board";

export interface Effect {
    applyEffect(board: Board, by: 1 | 2);
}
