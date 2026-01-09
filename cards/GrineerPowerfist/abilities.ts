import { Board } from "../../classes/Board";
import { Card } from "../../classes/Card";
import { DamageInstance } from "../../classes/DamageInstance";
import { StatusEffect } from "../../classes/StatusEffect";
import { Ability } from "../../classes/Ability";

export const abilities: ReadonlyArray<Ability> = [
    new Ability(
        "Furax",
        (_board: Board, _currentLocation: number, chosenCards: Card[], _variable: number, applicant: Card): void => {
            const chosenCard: Card = chosenCards[0];
            const dmg: DamageInstance = new DamageInstance(
                { Impact: 135 },
                25,
                2.3,
                11,
                applicant,
                chosenCard,
                "Melee",
            );
            chosenCard.applyDamage(dmg);
            dmg.calculateStatusEffects().forEach((proc: StatusEffect): void => chosenCard.applyProc(proc));
        },
        1,
        "Deals 135 @IMPACT",
        "Deals 135 @IMPACT to one enemy\nStatus Chance: 11%\nCritical Chance: 25%\nCritical Multiplier: 2.3x",
    ),
];
