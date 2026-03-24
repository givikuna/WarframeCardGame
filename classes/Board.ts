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

    public tick(priority: number, creditsToGive: number): void {
        const p1: Player = this[`getPlayer${priority}`]();
        const p2: Player = this[`getPlayer${priority === 1 ? 2 : 1}`]();

        p1.giveCredits(creditsToGive);
        p2.giveCredits(creditsToGive);

        // Tick Focus School Abilities

        p1.tick(this);
        p2.tick(this);

        // Tick Cephalon Ability (if any)
    }
}
