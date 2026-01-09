import { Board } from "../../classes/Board";
import { Card } from "../../classes/Card";
import { DamageInstance } from "../../classes/DamageInstance";
import { StatusEffect } from "../../classes/StatusEffect";
import { Ability } from "../../classes/Ability";

export const abilities: ReadonlyArray<Ability> = [
    new Ability(
        "Freeze",
        (_board: Board, _currentLocation: number, chosenCards: Card[], _variable: number, applicant: Card): void => {
            const chosenCard: Card = chosenCards[0];
            const dmg: DamageInstance = new DamageInstance({ Cold: 10 }, 2, 2, 1000, applicant, chosenCard, "Ranged");
            chosenCard.applyDamage(dmg);
            dmg.calculateStatusEffects().forEach((proc: StatusEffect): void => chosenCard.applyProc(proc));
        },
        5,
        "Deals 10 @COLD",
        "Deals 10 @COLD to one enemy\nStatus Chance: 1000%\nCritical Chance: 2%\nCritical Multiplier: 2x",
    ),
    new Ability(
        "Ice Wave",
        (_board: Board, _currentLocation: number, chosenCards: Card[], _variable: number, applicant: Card): void => {
            const chosenCard: Card = chosenCards[0];
            const dmg: DamageInstance = new DamageInstance(
                { Cold: 300 },
                5,
                2,
                600,
                applicant,
                chosenCard,
                "Projectile",
            );
            chosenCard.applyDamage(dmg);
            dmg.calculateStatusEffects().forEach((proc: StatusEffect): void => chosenCard.applyProc(proc));
        },
        7,
        "Deals 300 @COLD",
        "Deals 300 @COLD to one enemy\nStatus Chance: 600%\nCritical Chance: 5%\nCritical Multiplier: 2x",
    ),
    new Ability(
        "Avalanche",
        (_board: Board, _currentLocation: number, chosenCards: Card[], _variable: number, applicant: Card): void => {
            for (let i: number = 0; i < chosenCards.length; i++) {
                const dmg: DamageInstance = new DamageInstance(
                    { Cold: 200 },
                    5,
                    2,
                    1000,
                    applicant,
                    chosenCards[i],
                    "Ranged",
                );
                chosenCards[i].applyDamage(dmg);
                dmg.calculateStatusEffects().forEach((proc: StatusEffect): void => chosenCards[i].applyProc(proc));
            }
        },
        20,
        "Deals 200 @COLD to all",
        "Deals 200 @COLD to all enemies\nStatus Chance: 1000%\nCritical Chance: 5%\nCritical Multiplier: 2x",
    ),
];
