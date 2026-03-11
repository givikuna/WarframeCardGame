import { FactionSyndicate } from "../types/enums";

export class PlayerFaction {
    private faction: FactionSyndicate;

    public constructor(faction: FactionSyndicate) {
        this.faction = faction;
    }

    public static init(faction: FactionSyndicate): PlayerFaction {
        return new PlayerFaction(faction);
    }

    public getFaction(): FactionSyndicate {
        return this.faction;
    }

    public syndicateEffect(): void {
        // TBA
    }
}
