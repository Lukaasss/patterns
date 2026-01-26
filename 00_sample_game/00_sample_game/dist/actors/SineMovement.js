/**
 * Sinus-Bewegungsstrategie
 * Bewegt das Objekt in einer Sinuswelle
 */
export class SineMovement {
    constructor(centerX, amplitude = 80, frequency = 0.02) {
        this.centerX = centerX;
        this.startX = centerX;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.currentX = centerX;
    }
    calculateX(y, delta) {
        this.currentX = this.centerX + Math.sin(y * this.frequency) * this.amplitude;
        return this.currentX;
    }
    getCurrentX() {
        return this.currentX;
    }
    reset() {
        this.centerX = this.startX;
        this.currentX = this.startX;
    }
    setStartX(x) {
        this.startX = x;
        this.centerX = x;
        this.currentX = x;
    }
}
