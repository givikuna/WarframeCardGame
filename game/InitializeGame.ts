import { CardFactory } from "../cards/CardFactory";
import { Excalibur } from "../cards/Excalibur/Excalibur";
import { Board } from "../classes/Board";

const board: Board = new Board();

board.getLocations()[0].playCard(CardFactory.manufacture(Excalibur, 1, board, 1));
board.getLocations()[0].playCard(CardFactory.manufacture(Excalibur, 2, board, 1));

console.log(board.getLocations()[0].getPlayerTwoCards()[0].getShields());

board
    .getLocations()[0]
    .getPlayerOneCards()[0]
    .castAbility(1, [board.getLocations()[0].getPlayerTwoCards()[0]]);

console.log(board.getLocations()[0].getPlayerTwoCards()[0].getShields());
