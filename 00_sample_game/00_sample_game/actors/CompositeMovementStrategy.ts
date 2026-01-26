import { MovementStrategy } from "../patterns/Strategy.js";

/**
 * Composite Movement Strategy
 * Kombiniert zwei Bewegungsstrategien und wechselt bei einer bestimmten Y-Position
 * 
 * Dies ist eine Erweiterung des Strategy Patterns mit Composite-Elementen
 */
export class CompositeMovementStrategy implements MovementStrategy {
    private firstStrategy: MovementStrategy;
    private secondStrategy: MovementStrategy;
    private switchY: number;
    private hasSwitched: boolean = false;
    private currentStrategy: MovementStrategy;

    /**
     * @param firstStrategy - Strategie für den ersten Teil (y < switchY)
     * @param secondStrategy - Strategie für den zweiten Teil (y >= switchY)
     * @param switchY - Y-Position bei der gewechselt wird
     */
    constructor(
        firstStrategy: MovementStrategy,
        secondStrategy: MovementStrategy,
        switchY: number = 300
    ) {
        this.firstStrategy = firstStrategy;
        this.secondStrategy = secondStrategy;
        this.switchY = switchY;
        this.currentStrategy = firstStrategy;
    }

    calculateX(y: number, delta?: number): number {
        // Prüfe ob Strategiewechsel stattfinden soll
        if (y >= this.switchY && !this.hasSwitched) {
            // Übertrage die aktuelle X-Position zur neuen Strategie
            this.secondStrategy.setStartX(this.firstStrategy.getCurrentX());
            this.hasSwitched = true;
            this.currentStrategy = this.secondStrategy;
        }

        return this.currentStrategy.calculateX(y, delta);
    }

    getCurrentX(): number {
        return this.currentStrategy.getCurrentX();
    }

    reset(): void {
        this.firstStrategy.reset();
        this.secondStrategy.reset();
        this.hasSwitched = false;
        this.currentStrategy = this.firstStrategy;
    }

    setStartX(x: number): void {
        this.firstStrategy.setStartX(x);
        this.secondStrategy.setStartX(x);
    }
}
