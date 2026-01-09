import os

def create_placeholders():
    base_path = os.path.join("cards")
    start_index = 1
    end_index = 20
    start_id = 10
    abilities_content = """import { Board } from "../../classes/Board";
import { Card } from "../../classes/Card";
import { DamageInstance } from "../../classes/DamageInstance";
import { Ability } from "../../classes/Ability";

export const abilities: ReadonlyArray<Ability> = [
    new Ability(
        "Placeholder Attack",
        (
            _board: Board,
            _currentLocation: number,
            chosenCards: Card[],
            _variable: number,
            applicant: Card
        ): void => {
            const chosenCard: Card = chosenCards[0];
            const dmg: DamageInstance = new DamageInstance(
                { Tau: 100 },
                0,
                0,
                0,
                applicant,
                chosenCard,
                "Melee"
            );
            chosenCard.applyDamage(dmg);
        },
        1,
        "Deals 100 Tau Damage",
        "Deals 100 Tau Damage\\nStatus Chance: 0%\\nCritical Chance: 0%"
    ),
];
"""

    stats_template = """import {{ CardStats }} from "../../types/types";

export const stats: CardStats = {{
    faction: "Tenno",
    healthType: "Tenno",
    maxHealth: 100,
    maxShields: 0,
    maxOverguard: 0,
    baseArmor: 0,
    maxEnergy: 5,
    startingEnergy: 5,
    rarity: "Common",
    id: {id},
}};
"""

    main_card_template = """import {{ CardData }} from "../../types/types";
import {{ abilities }} from "./abilities";
import {{ stats }} from "./stats";

export const {name}: CardData = {{
    ...{{ name: "{name}" }},
    ...stats,
    ...{{ abilities: abilities }},
}};
"""

    print(f"Generating placeholders in {base_path}...")

    for i in range(start_index, end_index + 1):
        card_name = f"PlaceHolder{i}"
        current_id = start_id + (i - 1)
        dir_path = os.path.join(base_path, card_name)
        os.makedirs(dir_path, exist_ok=True)
        with open(os.path.join(dir_path, "abilities.ts"), "w") as f:
            f.write(abilities_content)
        with open(os.path.join(dir_path, "stats.ts"), "w") as f:
            f.write(stats_template.format(id=current_id))
        with open(os.path.join(dir_path, f"{card_name}.ts"), "w") as f:
            f.write(main_card_template.format(name=card_name))
        print(f"Created {card_name} (ID: {current_id})")

if __name__ == "__main__":
    create_placeholders()
