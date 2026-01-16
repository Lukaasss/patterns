export class SineMovement {
    constructor(centerX, amplitude = 80, frequency = 0.02) {
        this.centerX = centerX;
        this.amplitude = amplitude;
        this.frequency = frequency;
    }
    calculateX(y) {
        return this.centerX + Math.sin(y * this.frequency) * this.amplitude;
    }
    reset() {
        // Nichts zu resetten
    }
}
