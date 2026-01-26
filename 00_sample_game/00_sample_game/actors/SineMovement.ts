import { MovementStrategy } from "../patterns/Strategy.js";

/**
 * Sinus-Bewegungsstrategie
 * Bewegt das Objekt in einer Sinuswelle
 */
export class SineMovement implements MovementStrategy {
    private centerX: number;
    private startX: number;
    private amplitude: number;
    private frequency: number;
    private currentX: number;

    constructor(centerX: number, amplitude: number = 80, frequency: number = 0.02) {
        this.centerX = centerX;
        this.startX = centerX;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.currentX = centerX;
    }

    calculateX(y: number, delta?: number): number {
        this.currentX = this.centerX + Math.sin(y * this.frequency) * this.amplitude;
        return this.currentX;
    }

    getCurrentX(): number {
        return this.currentX;
    }

    reset(): void {
        this.centerX = this.startX;
        this.currentX = this.startX;
    }

    setStartX(x: number): void {
        this.startX = x;
        this.centerX = x;
        this.currentX = x;
    }
}
