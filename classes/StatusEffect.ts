export class StatusEffect {
    public readonly name: string;
    protected turnsLived: number = 0;
    protected max: number = 2;

    public constructor(name: string, max: number) {
        this.name = name;
        this.max = max;
    }

    public nextTurn(): void {
        this.turnsLived++;
    }

    public getDuration(): number {
        return this.max - this.turnsLived;
    }
}
