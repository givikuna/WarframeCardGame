import { AbilityFunction } from "../types/types";

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
}
