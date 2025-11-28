import { AbilityFunction, Resource } from "../types/types";

export class Ability {
    protected readonly name: string;
    protected readonly abilityFunction: AbilityFunction;
    protected readonly abilityCost: number;
    protected readonly passive: boolean;
    protected readonly resource: Resource;

    public constructor(
        name: string,
        func: AbilityFunction,
        cost: number,
        passive: boolean,
        resource: Resource,
    ) {
        this.name = name;
        this.abilityFunction = func;
        this.abilityCost = cost;
        this.passive = passive;
        this.resource = resource;
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

    public isPassive(): boolean {
        return this.passive;
    }

    public getResource(): Resource {
        return this.resource;
    }
}
