export class ZigZagMovement {
    constructor(startX, horizontalSpeed = 150, zigZagDistance = 50) {
        this.direction = 1;
        this.x = startX;
        this.startX = startX;
        this.horizontalSpeed = horizontalSpeed;
        this.zigZagDistance = zigZagDistance;
    }
    calculateX(y, delta) {
        this.x += this.direction * this.horizontalSpeed * delta;
        if (this.x > this.startX + this.zigZagDistance) {
            this.direction = -1;
        }
        else if (this.x < this.startX - this.zigZagDistance) {
            this.direction = 1;
        }
        return this.x;
    }
    reset() {
        this.x = this.startX;
        this.direction = 1;
    }
    getCurrentX() {
        return this.x;
    }
}
