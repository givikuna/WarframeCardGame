import { Ability } from "../../classes/Ability";
import { Board } from "../../classes/Board";
import { BoardLocation } from "../../classes/BoardLocation";
import { Card } from "../../classes/Card";
import { DamageInstance } from "../../classes/DamageInstance";
import { fails } from "../../classes/modules/fails";
import { DamageDistributionDictionary } from "../../types/types";

/*
Clem shoots 15 bullets at the chosen enemy card.
Each bullet does 3.7 Puncture, 2.9 Slash, and 4.4 Impact damage.
*/
export const TwinGrakatas: Ability = new Ability(
    (
        board: Board,
        currentLocation: number,
        chosenCards: Card[],
        _variable: number,
        applicant: Card,
    ): boolean => {
        if (fails(applicant, chosenCards[0])) {
            return false;
        }

        currentLocation = currentLocation >= 3 ? Math.abs(currentLocation % 3) : currentLocation;

        if (chosenCards.length === 0) {
            chosenCards = board
                .getLocations()
                [currentLocation][`getPlayer${applicant.getPlayer() === 2 ? "Two" : "One"}Cards`]();
        }

        const bulletCount: number = 15;

        const totalDamage: number = 11;

        const damagePerBulletDistribution: DamageDistributionDictionary = {
            Puncture: 33.64,
            Slash: 26.36,
            Impact: 40,
        };

        const finalDamageInstance = new DamageInstance(
            totalDamage * bulletCount,
            damagePerBulletDistribution,
            20.0,
            25.0,
            2.0,
            chosenCards[0],
            applicant,
        );

        chosenCards[0].damage(finalDamageInstance);

        return true;
    },
    35,
);
