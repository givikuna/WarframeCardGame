import { Board } from "../../classes/Board";
import { Card } from "../../classes/Card";
import { DamageInstance } from "../../classes/DamageInstance";
import { StatusEffect } from "../../classes/StatusEffect";
import { Ability } from "../../classes/Ability";

export const abilities: ReadonlyArray<Ability> = [
    new Ability(
        "Sonic Boom",
        (_board: Board, _currentLocation: number, chosenCards: Card[], _variable: number, applicant: Card): void => {
            for (let i: number = 0; i < chosenCards.length; i++) {
                const dmg: DamageInstance = new DamageInstance(
                    { Impact: 50 },
                    35,
                    1.34,
                    67,
                    applicant,
                    chosenCards[i],
                    "Ranged",
                );
                chosenCards[i].applyDamage(dmg);
                dmg.calculateStatusEffects().forEach((proc: StatusEffect): void => chosenCards[i].applyProc(proc));
            }
        },
        2,
        "Deals 50 @IMPACT to all",
        "Deals 50 @IMPACT damage to all enemies at this location\nStatus Chance: 67%\nCritical Chance: 35%\nCritical Damage Multiplier: 1.34x",
    ),
    new Ability(
        "Sound Quake",
        (_board: Board, _currentLocation: number, chosenCards: Card[], _variable: number, applicant: Card): void => {
            for (let i: number = 0; i < chosenCards.length; i++) {
                const dmg: DamageInstance = new DamageInstance(
                    { Blast: 120 },
                    20,
                    1.4,
                    60,
                    applicant,
                    chosenCards[i],
                    "Ranged",
                );
                chosenCards[i].applyDamage(dmg);
                dmg.calculateStatusEffects().forEach((proc: StatusEffect): void => chosenCards[i].applyProc(proc));
            }
        },
        5,
        "Deals 120 @BLAST to all",
        "Deals 120 @BLAST to all enemies\nStatus Chance: 60%\nCritical Chance: 20%\nCritical Multiplier: 1.4x",
    ),
];
