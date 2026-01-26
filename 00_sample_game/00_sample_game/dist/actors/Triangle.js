import { movementFactory } from "./MovementStrategyFactory.js";
/**
 * Triangle Actor - verwendet das Strategy Pattern für Bewegung
 */
export class Triangle {
    constructor(x = 250) {
        this.y = 0;
        this.speedMultiplier = 1;
        this.reachedBottom = false;
        // Zufällige Geschwindigkeit zwischen 60 und 200
        this.speed = Math.floor(Math.random() * 140) + 60;
        this.x = x;
        this.startX = x;
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
        this.x = this.movementStrategy.calculateX(this.y, delta);
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
        ctx.fillStyle = '#00FF00';
        ctx.beginPath();
        ctx.moveTo(this.x + 25, this.y);
        ctx.lineTo(this.x, this.y + 50);
        ctx.lineTo(this.x + 50, this.y + 50);
        ctx.closePath();
        ctx.fill();
    }
    getPosition() {
        return { x: this.x, y: this.y };
    }
    reset() {
        this.y = 0;
        // Neue zufällige Position und Strategie
        const newX = Math.floor(Math.random() * 450) + 50;
        this.x = newX;
        this.startX = newX;
        this.movementStrategy = movementFactory.createRandomCompositeStrategy({ startX: newX });
    }
    setSpeedMultiplier(multiplier) {
        this.speedMultiplier = multiplier;
    }
}
