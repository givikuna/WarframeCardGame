import { DamageType } from "../types/enums";

export class Operator {
    private health: number = 1000;

    private constructor() {}

    public static new(): Operator {
        return new Operator();
    }

    public getHealth(): number {
        return this.health;
    }

    public takeDamage(x: number, dt: DamageType = DamageType.True): void {
        this.health -= x * (dt === DamageType.Void ? 1.5 : 1);
    }

    public heal(x: number): void {
        this.takeDamage(-x);
    }
}
