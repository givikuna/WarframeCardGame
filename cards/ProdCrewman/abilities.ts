import { Board } from "../../classes/Board";
import { Card } from "../../classes/Card";
import { DamageInstance } from "../../classes/DamageInstance";
import { StatusEffect } from "../../classes/StatusEffect";
import { Ability } from "../../classes/Ability";

export const abilities: ReadonlyArray<Ability> = [
    new Ability(
        "Prova",
        (_board: Board, _currentLocation: number, chosenCards: Card[], _variable: number, applicant: Card): void => {
            const chosenCard: Card = chosenCards[0];
            const dmg: DamageInstance = new DamageInstance(
                { Impact: 50, Electricity: 70 },
                14,
                2.0,
                16,
                applicant,
                chosenCard,
                "Melee",
            );
            chosenCard.applyDamage(dmg);
            dmg.calculateStatusEffects().forEach((proc: StatusEffect): void => chosenCard.applyProc(proc));
        },
        1,
        "Deals 50 @IMPACT, 70 @ELECTRICITY",
        "Deals 50 @IMPACT, 70 @ELECTRICITY to one enemy\nStatus Chance: 16%\nCritical Chance: 14%\nCritical Multiplier: 2.0x",
    ),
];
