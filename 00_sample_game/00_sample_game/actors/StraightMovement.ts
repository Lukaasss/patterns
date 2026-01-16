export class StraightMovement {
    private startX: number;
    private x: number;

    constructor(startX: number) {
        this.startX = startX;
        this.x = startX;
    }

    calculateX(y: number): number {
        return this.startX;
    }

    reset(): void {
        this.x = this.startX;
    }
}
