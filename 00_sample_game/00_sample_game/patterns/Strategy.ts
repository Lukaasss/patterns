/**
 * Strategy Pattern
 * 
 * Das Strategy Pattern ermöglicht:
 * - Austauschbare Algorithmen zur Laufzeit
 * - Trennung von Algorithmus und Kontext
 * - Einfaches Hinzufügen neuer Strategien
 * - Vermeidung von switch/case Anweisungen
 * 
 * Komponenten:
 * - Strategy Interface: Definiert die gemeinsame Schnittstelle
 * - Concrete Strategy: Konkrete Implementierung einer Strategie
 * - Context: Verwendet die Strategie
 */

/**
 * Generisches Strategy Interface
 */
export interface Strategy<TInput, TOutput> {
    execute(input: TInput): TOutput;
}

/**
 * Context-Klasse für das Strategy Pattern
 * Verwendet eine austauschbare Strategie
 */
export class StrategyContext<TInput, TOutput> {
    private strategy: Strategy<TInput, TOutput>;

    constructor(strategy: Strategy<TInput, TOutput>) {
        this.strategy = strategy;
    }

    /**
     * Setzt eine neue Strategie
     */
    setStrategy(strategy: Strategy<TInput, TOutput>): void {
        this.strategy = strategy;
    }

    /**
     * Führt die aktuelle Strategie aus
     */
    executeStrategy(input: TInput): TOutput {
        return this.strategy.execute(input);
    }
}

/**
 * Movement Strategy Interface für das Spiel
 * Spezialisierte Strategie für Bewegungsberechnungen
 */
export interface MovementStrategy {
    /**
     * Berechnet die X-Position basierend auf der Y-Position
     */
    calculateX(y: number, delta?: number): number;

    /**
     * Gibt die aktuelle X-Position zurück
     */
    getCurrentX(): number;

    /**
     * Setzt die Strategie zurück
     */
    reset(): void;

    /**
     * Setzt die Startposition
     */
    setStartX(x: number): void;
}
