import { Board } from "../../classes/Board";
import { Card } from "../../classes/Card";
import { DamageInstance } from "../../classes/DamageInstance";
import { StatusEffect } from "../../classes/StatusEffect";
import { Ability } from "../../classes/Ability";

export const abilities: ReadonlyArray<Ability> = [
    new Ability(
        "Slash Dash",
        (
            _board: Board,
            _currentLocation: number,
            chosenCards: Card[],
            _variable: number,
            applicant: Card,
        ): void => {
            const chosenCard: Card = chosenCards[0];
            const slashDashDamageInstance: DamageInstance = new DamageInstance(
                { Slash: 150 },
                26,
                2,
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
    ),
];
