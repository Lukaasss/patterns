/**
 * ZigZag-Bewegungsstrategie
 * Bewegt das Objekt in einer Zickzack-Linie
 */
export class ZigZagMovement {
    constructor(startX, horizontalSpeed = 150, zigZagDistance = 50) {
        this.direction = 1;
        this.x = startX;
        this.startX = startX;
        this.horizontalSpeed = horizontalSpeed;
        this.zigZagDistance = zigZagDistance;
    }
    calculateX(y, delta) {
        // delta ist erforderlich für zeitbasierte Bewegung
        const d = delta !== null && delta !== void 0 ? delta : 0.016; // Fallback auf ~60fps
        this.x += this.direction * this.horizontalSpeed * d;
        if (this.x > this.startX + this.zigZagDistance) {
            this.direction = -1;
        }
        else if (this.x < this.startX - this.zigZagDistance) {
            this.direction = 1;
        }
        return this.x;
    }
    getCurrentX() {
        return this.x;
    }
    reset() {
        this.x = this.startX;
        this.direction = 1;
    }
    setStartX(x) {
        this.startX = x;
        this.x = x;
        this.direction = 1;
    }
}
