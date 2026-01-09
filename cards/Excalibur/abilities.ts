import { Board } from "../../classes/Board";
import { Card } from "../../classes/Card";
import { DamageInstance } from "../../classes/DamageInstance";
import { StatusEffect } from "../../classes/StatusEffect";
import { Ability } from "../../classes/Ability";

export const abilities: ReadonlyArray<Ability> = [
    new Ability(
        "Slash Dash",
        (_board: Board, _currentLocation: number, chosenCards: Card[], _variable: number, applicant: Card): void => {
            const chosenCard: Card = chosenCards[0];

            const slashDashDamageInstance: DamageInstance = new DamageInstance(
                { Slash: 75 },
                20,
                1.75,
                26,
                applicant,
                chosenCard,
                "Melee",
            );

            chosenCard.applyDamage(slashDashDamageInstance);
            slashDashDamageInstance
                .calculateStatusEffects()
                .forEach((proc: StatusEffect): void => chosenCard.applyProc(proc));
        },
        1,
        "Deals 75 @SLASH",
        "Deals 75 @SLASH to the chosen enemy card\nStatus Chance: 26%\nCritical Chance: 26%\nCritical Damage Multiplier: 1.75x",
    ),
    new Ability(
        "Radial Javelin",
        (_board: Board, _currentLocation: number, chosenCards: Card[], _variable: number, applicant: Card): void => {
            for (let i: number = 0; i < chosenCards.length; i++) {
                const dmg: DamageInstance = new DamageInstance(
                    { Slash: 17 },
                    17,
                    2,
                    100,
                    applicant,
                    chosenCards[i],
                    "Melee",
                );
                chosenCards[i].applyDamage(dmg);
                dmg.calculateStatusEffects().forEach((proc: StatusEffect): void => chosenCards[i].applyProc(proc));
            }
        },
        2,
        "Deals 17 @SLASH to all",
        "Deals 17 @SLASH to all enemy cards at this location\nStatusChance: 100%\nCriticalChance:17%\nCritical Damage Multiplier: 2x",
    ),
];
