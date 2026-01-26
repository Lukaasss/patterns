import { MovementStrategy } from "../patterns/Strategy.js";

/**
 * Gerade-Bewegungsstrategie
 * Bewegt das Objekt in einer geraden Linie nach unten
 */
export class StraightMovement implements MovementStrategy {
    private startX: number;
    private x: number;

    constructor(startX: number) {
        this.startX = startX;
        this.x = startX;
    }

    calculateX(y: number, delta?: number): number {
        return this.x;
    }

    getCurrentX(): number {
        return this.x;
    }

    reset(): void {
        this.x = this.startX;
    }

    setStartX(x: number): void {
        this.startX = x;
        this.x = x;
    }
}
