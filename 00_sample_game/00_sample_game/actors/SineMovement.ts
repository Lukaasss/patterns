export class SineMovement {
    private centerX: number;
    private amplitude: number;
    private frequency: number;

    constructor(centerX: number, amplitude: number = 80, frequency: number = 0.02) {
        this.centerX = centerX;
        this.amplitude = amplitude;
        this.frequency = frequency;
    }

    calculateX(y: number): number {
        return this.centerX + Math.sin(y * this.frequency) * this.amplitude;
    }

    reset(): void {
        // Nichts zu resetten
    }
}
