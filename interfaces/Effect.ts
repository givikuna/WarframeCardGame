import { Board } from "../classes/Board";
import { Player } from "../classes/Player";

export interface Effect {
    applyEffect: (board: Board, by: Player) => void;
}
