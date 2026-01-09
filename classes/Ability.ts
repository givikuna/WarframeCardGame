import { AbilityFunction } from "../types/types";

export class Ability {
    protected readonly name: string;
    protected readonly abilityFunction: AbilityFunction;
    protected readonly abilityCost: number;
    protected readonly description: string;
    protected readonly fullDescription: string;

    public constructor(
        name: string,
        func: AbilityFunction,
        cost: number,
        description: string = "No description",
        fullDescription: string = "No details",
    ) {
        this.name = name;
        this.abilityFunction = func;
        this.abilityCost = cost;
        this.description = description;
        this.fullDescription = fullDescription;
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

    public getDescription(): string {
        return this.description;
    }
    public getFullDescription(): string {
        return this.fullDescription;
    }
}
