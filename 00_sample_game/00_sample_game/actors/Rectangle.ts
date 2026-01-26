import { Actor } from "./Actor.js";
import { MovementStrategy } from "../patterns/Strategy.js";
import { movementFactory } from "./MovementStrategyFactory.js";

/**
 * Rectangle Actor - verwendet das Strategy Pattern für Bewegung
 */
export class Rectangle implements Actor {
    private y: number = 0;
    private speed: number;
    private speedMultiplier: number = 1;
    private startX: number;
    private currentX: number = 0;
    private reachedBottom: boolean = false;

    // Strategy Pattern: Die Bewegung wird durch eine austauschbare Strategie gesteuert
    private movementStrategy: MovementStrategy;

    constructor(x: number = 100) {
        // Zufällige Geschwindigkeit zwischen 50 und 180
        this.speed = Math.floor(Math.random() * 130) + 50;
        this.startX = x;
        this.currentX = x;

        // Erstelle eine zufällige Composite-Bewegungsstrategie
        this.movementStrategy = movementFactory.createRandomCompositeStrategy({ startX: x });
    }

    /**
     * Ermöglicht das Setzen einer neuen Bewegungsstrategie zur Laufzeit
     */
    setMovementStrategy(strategy: MovementStrategy): void {
        this.movementStrategy = strategy;
    }

    move(delta: number): void {
        this.reachedBottom = false;
        this.y += this.speed * this.speedMultiplier * delta;

        // Berechne X-Position über die aktuelle Strategie
        this.currentX = this.movementStrategy.calculateX(this.y, delta);

        if (this.y > 600) {
            this.y = 0;
            this.movementStrategy.reset();
            this.reachedBottom = true;
        }
    }

    hasReachedBottom(): boolean {
        return this.reachedBottom;
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.currentX, this.y, 50, 50);
    }

    getPosition(): { x: number; y: number } {
        return { x: this.currentX, y: this.y };
    }

    reset(): void {
        this.y = 0;
        // Neue zufällige Position und Strategie
        const newX = Math.floor(Math.random() * 450) + 50;
        this.startX = newX;
        this.currentX = newX;
        this.movementStrategy = movementFactory.createRandomCompositeStrategy({ startX: newX });
    }

    setSpeedMultiplier(multiplier: number): void {
        this.speedMultiplier = multiplier;
    }
}
