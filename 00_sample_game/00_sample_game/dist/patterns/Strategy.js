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
 * Context-Klasse für das Strategy Pattern
 * Verwendet eine austauschbare Strategie
 */
export class StrategyContext {
    constructor(strategy) {
        this.strategy = strategy;
    }
    /**
     * Setzt eine neue Strategie
     */
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    /**
     * Führt die aktuelle Strategie aus
     */
    executeStrategy(input) {
        return this.strategy.execute(input);
    }
}
