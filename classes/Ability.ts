import { AbilityFunction } from "../types/types";
import { Card } from "./Card";
import { Board } from "./Board";

export class Ability {
    protected readonly abilityFunction: AbilityFunction;
    protected readonly abilityCost: number;

    public constructor(abilityFunction: AbilityFunction, abilityCost: number) {
        this.abilityFunction = abilityFunction;
        this.abilityCost = abilityCost;
    }

    public getAbilityFunction(): AbilityFunction {
        return this.abilityFunction;
    }

    public getAbilityCost(): number {
        return this.abilityCost;
    }

    public apply(
        board: Board,
        currentLocation: number,
        chosenCards: Card[],
        variable: number,
        applicant: Card,
    ) {
        this.abilityFunction(board, currentLocation, chosenCards, variable, applicant);
    }
}
