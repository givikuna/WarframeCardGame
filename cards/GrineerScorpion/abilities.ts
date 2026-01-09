import { Board } from "../../classes/Board";
import { Card } from "../../classes/Card";
import { DamageInstance } from "../../classes/DamageInstance";
import { StatusEffect } from "../../classes/StatusEffect";
import { Ability } from "../../classes/Ability";

export const abilities: ReadonlyArray<Ability> = [
    new Ability(
        "Machete",
        (_board: Board, _currentLocation: number, chosenCards: Card[], _variable: number, applicant: Card): void => {
            const chosenCard: Card = chosenCards[0];
            const dmg: DamageInstance = new DamageInstance(
                { Slash: 60, Puncture: 15, Impact: 18 },
                10,
                1.5,
                15,
                applicant,
                chosenCard,
                "Melee",
            );
            chosenCard.applyDamage(dmg);
            dmg.calculateStatusEffects().forEach((proc: StatusEffect): void => chosenCard.applyProc(proc));
        },
        1,
        "Deals 60 @SLASH, 15 @PUNCTURE, 18 @IMPACT",
        "Deals 60 @SLASH, 15 @PUNCTURE, 18 @IMPACT to one enemy\nStatus Chance: 15%\nCritical Chance: 10%\nCritical Multiplier: 1.5x",
    ),
];
