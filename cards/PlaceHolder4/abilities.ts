import { Board } from "../../classes/Board";
import { Card } from "../../classes/Card";
import { DamageInstance } from "../../classes/DamageInstance";
import { Ability } from "../../classes/Ability";

export const abilities: ReadonlyArray<Ability> = [
    new Ability(
        "Placeholder Attack",
        (_board: Board, _currentLocation: number, chosenCards: Card[], _variable: number, applicant: Card): void => {
            const chosenCard: Card = chosenCards[0];
            const dmg: DamageInstance = new DamageInstance({ Tau: 100 }, 0, 0, 0, applicant, chosenCard, "Melee");
            chosenCard.applyDamage(dmg);
        },
        1,
        "Deals 100 Tau Damage",
        "Deals 100 Tau Damage\nStatus Chance: 0%\nCritical Chance: 0%",
    ),
];
