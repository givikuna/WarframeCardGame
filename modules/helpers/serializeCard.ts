import { Ability } from "../../classes/Ability";

import { SerializedAbility, SerializedCard } from "../../interfaces/protocol";

import { CardData } from "../../types/types";

export function serializeCard(c: CardData): SerializedCard {
    return {
        id: c.id,
        name: c.name,
        rarity: c.rarity,
        stats: {
            health: c.maxHealth,
            shields: c.maxShields,
            armor: c.baseArmor,
            overguard: c.maxOverguard,
            maxEnergy: c.maxEnergy,
            startingEnergy: c.startingEnergy,
            faction: c.faction,
            healthType: c.healthType,
        },
        abilities: c.abilities.map(
            (a: Ability): SerializedAbility => ({
                name: a.getName(),
                cost: a.getCost(),
                description: a.getDescription(),
                fullDescription: a.getFullDescription(),
            }),
        ),
    };
}
