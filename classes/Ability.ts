import { AbilityFunction } from "../types/types";

export class Ability {
    protected readonly name: string;
    protected readonly abilityFunction: AbilityFunction;
    protected readonly abilityCost: number;

    public constructor(name: string, func: AbilityFunction, cost: number) {
        this.name = name;
        this.abilityFunction = func;
        this.abilityCost = cost;
    }

    public getName(): string {
        return this.name;
    }

    public getAbilityFunction(): AbilityFunction {
        return this.abilityFunction;
    }

    public getCost(): number {
        return this.abilityCost;
    }
}
