import { CardFactory } from "../cards/CardFactory";
import { Excalibur } from "../cards/Excalibur/Excalibur";
import { Board } from "../classes/Board";

const board: Board = new Board();

board.getLocations()[0].playCard(CardFactory.manufacture(Excalibur, 1, board, 1));
board.getLocations()[0].playCard(CardFactory.manufacture(Excalibur, 2, board, 1));

for (let i: number = 0; i < 2; i++) {
    board
        .getLocations()[0]
        .getPlayerOneCards()[0]
        .castAbility(1, [board.getLocations()[0].getPlayerTwoCards()[0]]);

    console.log(
        `Attack ${i + 1}: ${board.getLocations()[0].getPlayerTwoCards()[0].getShields()} ${board
            .getLocations()[0]
            .getPlayerTwoCards()[0]
            .getHealth()}`,
    );

    board.nextTurn();
}

for (let i: number = 0; i < 10; i++) {
    board
        .getLocations()[0]
        .getPlayerOneCards()[0]
        .castAbility(2, [board.getLocations()[0].getPlayerTwoCards()[0]]);

    console.log(
        `Attack ${i + 1}: ${board.getLocations()[0].getPlayerTwoCards()[0].getShields()} ${board
            .getLocations()[0]
            .getPlayerTwoCards()[0]
            .getHealth()}`,
    );
}
