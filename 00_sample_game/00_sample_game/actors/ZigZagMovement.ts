export class ZigZagMovement {
    private x: number;
    private startX: number;
    private direction: number = 1;
    private horizontalSpeed: number;
    private zigZagDistance: number;

    constructor(startX: number, horizontalSpeed: number = 150, zigZagDistance: number = 50) {
        this.x = startX;
        this.startX = startX;
        this.horizontalSpeed = horizontalSpeed;
        this.zigZagDistance = zigZagDistance;
    }

    calculateX(y: number, delta: number): number {
        this.x += this.direction * this.horizontalSpeed * delta;

        if (this.x > this.startX + this.zigZagDistance) {
            this.direction = -1;
        } else if (this.x < this.startX - this.zigZagDistance) {
            this.direction = 1;
        }

        return this.x;
    }

    reset(): void {
        this.x = this.startX;
        this.direction = 1;
    }

    getCurrentX(): number {
        return this.x;
    }
}
