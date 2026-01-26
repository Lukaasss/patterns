import { movementFactory } from "./MovementStrategyFactory.js";
/**
 * Rectangle Actor - verwendet das Strategy Pattern für Bewegung
 */
export class Rectangle {
    constructor(x = 100) {
        this.y = 0;
        this.speedMultiplier = 1;
        this.currentX = 0;
        this.reachedBottom = false;
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
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.currentX, this.y, 50, 50);
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
