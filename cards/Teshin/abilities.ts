import { Board } from "../../classes/Board";
import { Card } from "../../classes/Card";
import { DamageInstance } from "../../classes/DamageInstance";
import { StatusEffect } from "../../classes/StatusEffect";
import { Ability } from "../../classes/Ability";

export const abilities: ReadonlyArray<Ability> = [
    new Ability(
        "Sun & Moon",
        (_board: Board, _currentLocation: number, chosenCards: Card[], _variable: number, applicant: Card): void => {
            const chosenCard: Card = chosenCards[0];
            // 20% Impact (38), 24% Puncture (45.6), 56% Slash (106.4) of 190
            const dmg: DamageInstance = new DamageInstance(
                { Impact: 38, Puncture: 45.6, Slash: 106.4 },
                20,
                2.4,
                22,
                applicant,
                chosenCard,
                "Melee",
            );
            chosenCard.applyDamage(dmg);
            dmg.calculateStatusEffects().forEach((proc: StatusEffect): void => chosenCard.applyProc(proc));
        },
        2,
        "Deals 190 Mixed Damage",
        "Deals 190 (Impact, Puncture, Slash) to one enemy\nStatus Chance: 22%\nCritical Chance: 20%\nCritical Multiplier: 2.4x",
    ),
    new Ability(
        "Carving Mantis",
        (_board: Board, _currentLocation: number, chosenCards: Card[], _variable: number, applicant: Card): void => {
            const chosenCard: Card = chosenCards[0];
            const dmg: DamageInstance = new DamageInstance({ Heat: 190 }, 20, 2.4, 100, applicant, chosenCard, "Melee");
            chosenCard.applyDamage(dmg);
            dmg.calculateStatusEffects().forEach((proc: StatusEffect): void => chosenCard.applyProc(proc));
        },
        3,
        "Deals 190 @HEAT",
        "Changes Sun & Moon's damage to HEAT.\nStatus Chance: 100%\nCritical Chance: 20%\nCritical Multiplier: 2.4x",
    ),
    new Ability(
        "Crossing Snakes",
        (_board: Board, _currentLocation: number, chosenCards: Card[], _variable: number, applicant: Card): void => {
            const chosenCard: Card = chosenCards[0];
            const dmg: DamageInstance = new DamageInstance({ Cold: 190 }, 20, 2.4, 100, applicant, chosenCard, "Melee");
            chosenCard.applyDamage(dmg);
            dmg.calculateStatusEffects().forEach((proc: StatusEffect): void => chosenCard.applyProc(proc));
        },
        3,
        "Deals 190 @COLD",
        "Changes Sun & Moon's damage to COLD.\nStatus Chance: 100%\nCritical Chance: 20%\nCritical Multiplier: 2.4x",
    ),
    new Ability(
        "Swirling Tiger",
        (_board: Board, _currentLocation: number, chosenCards: Card[], _variable: number, applicant: Card): void => {
            const chosenCard: Card = chosenCards[0];
            const dmg: DamageInstance = new DamageInstance(
                { Electricity: 190 },
                20,
                2.4,
                100,
                applicant,
                chosenCard,
                "Melee",
            );
            chosenCard.applyDamage(dmg);
            dmg.calculateStatusEffects().forEach((proc: StatusEffect): void => chosenCard.applyProc(proc));
        },
        3,
        "Deals 190 @ELECTRICITY",
        "Changes Sun & Moon's damage to Electricity.\nStatus Chance: 100%\nCritical Chance: 20%\nCritical Multiplier: 2.4x",
    ),
];
