import { Player } from "./Player";

export class Board {
    private player1: Player;
    private player2: Player;

    public constructor(player1: Player, player2: Player) {
        this.player1 = player1;
        this.player2 = player2;
    }

    public getPlayer1(): Player {
        return this.player1;
    }

    public getPlayer2(): Player {
        return this.player2;
    }

    // -- // -- //

    public tick(): void {
        this.getPlayer1().tick(this);
        this.getPlayer2().tick(this);
    }
}
