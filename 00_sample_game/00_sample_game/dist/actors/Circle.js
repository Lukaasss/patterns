import { movementFactory } from "./MovementStrategyFactory.js";
/**
 * Circle Actor - verwendet das Strategy Pattern für Bewegung
 */
export class Circle {
    constructor(x = 400) {
        this.y = 0;
        this.speedMultiplier = 1;
        this.currentX = 0;
        this.reachedBottom = false;
        // Zufällige Geschwindigkeit zwischen 40 und 160
        this.speed = Math.floor(Math.random() * 120) + 40;
        this.startX = x;
        this.currentX = x;
        // Erstelle eine zufällige Composite-Bewegungsstrategie
        this.movementStrategy = movementFactory.createRandomCompositeStrategy({ startX: x });
    }
    /**
     * Ermöglicht das Setzen einer neuen Bewegungsstrategie zur Laufzeit
     */
    setMovementStrategy(strategy) {
        this.movementStrategy = strategy;
    }
    move(delta) {
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
    hasReachedBottom() {
        return this.reachedBottom;
    }
    render(ctx) {
        ctx.fillStyle = '#0000FF';
        ctx.beginPath();
        ctx.arc(this.currentX + 25, this.y + 25, 25, 0, Math.PI * 2);
        ctx.fill();
    }
    getPosition() {
        return { x: this.currentX, y: this.y };
    }
    reset() {
        this.y = 0;
        // Neue zufällige Position und Strategie
        const newX = Math.floor(Math.random() * 450) + 50;
        this.startX = newX;
        this.currentX = newX;
        this.movementStrategy = movementFactory.createRandomCompositeStrategy({ startX: newX });
    }
    setSpeedMultiplier(multiplier) {
        this.speedMultiplier = multiplier;
    }
}
