import { Board } from "../../classes/Board";
import { Card } from "../../classes/Card";
import { DamageInstance } from "../../classes/DamageInstance";
import { StatusEffect } from "../../classes/StatusEffect";
import { Ability } from "../../classes/Ability";

export const abilities: ReadonlyArray<Ability> = [
    new Ability(
        "Cleave",
        (_board: Board, _currentLocation: number, chosenCards: Card[], _variable: number, applicant: Card): void => {
            const chosenCard: Card = chosenCards[0];
            const dmg: DamageInstance = new DamageInstance({ Slash: 60 }, 25, 3.0, 10, applicant, chosenCard, "Melee");
            chosenCard.applyDamage(dmg);
            dmg.calculateStatusEffects().forEach((proc: StatusEffect): void => chosenCard.applyProc(proc));
        },
        1,
        "Deals 60 @SLASH",
        "Deals 60 @SLASH to one enemy\nStatus Chance: 10%\nCritical Chance: 25%\nCritical Multiplier: 3.0x",
    ),
];
