import { DamageType } from "../types/enums";

export class Operator {
    private health: number = 1000;
    private shield: number = 100;

    private constructor() {}

    public static new(): Operator {
        return new Operator();
    }

    public getHealth(): number {
        return this.health;
    }

    public getShield(): number {
        return this.shield;
    }

    public takeDamage(x: number, dt: DamageType = DamageType.True): void {
        if (dt === DamageType.Toxin) {
            this.health -= x;
            return;
        }

        if (this.shield !== 0) {
            this.shield -= x * (dt === DamageType.Void || dt === DamageType.Magnetic ? 1.5 : 1);
            if (this.shield < 0) this.shield = 0;
            return;
        }

        this.health -= x * (dt === DamageType.Void ? 1.5 : 1);
    }

    public heal(x: number): void {
        this.takeDamage(-x, DamageType.Toxin);
    }

    public restoreShields(x: number): void {
        this.shield += x;
    }
}
