/**
 * Factory Pattern
 * 
 * Das Factory Pattern kapselt die Objekterstellung und ermöglicht:
 * - Zentrale Stelle für die Erstellung von Objekten
 * - Client-Code muss konkrete Klassen nicht kennen
 * - Einfache Erweiterung um neue Typen
 * - Einheitliche Konfiguration bei der Erstellung
 * 
 * Varianten:
 * - Simple Factory: Einfache Fabrikmethode
 * - Factory Method: Abstrakte Fabrikmethode in Basisklasse
 * - Abstract Factory: Familie verwandter Objekte erstellen
 */

/**
 * Generisches Factory Interface
 */
export interface Factory<T, C = void> {
    create(config?: C): T;
}

/**
 * Abstract Factory Interface
 * Für Familien von verwandten Objekten
 */
export interface AbstractFactory<TMap extends Record<string, any>, C = void> {
    create<K extends keyof TMap>(type: K, config?: C): TMap[K];
}

/**
 * Registry-basierte Factory
 * Ermöglicht das dynamische Registrieren von Typen
 */
export class RegistryFactory<T, C = void> implements Factory<T, C> {
    private creators: Map<string, (config?: C) => T> = new Map();
    private defaultType: string | null = null;

    /**
     * Registriert einen Creator für einen Typ
     */
    register(type: string, creator: (config?: C) => T): void {
        this.creators.set(type, creator);
    }

    /**
     * Setzt den Standard-Typ
     */
    setDefault(type: string): void {
        if (!this.creators.has(type)) {
            throw new Error(`Typ "${type}" ist nicht registriert`);
        }
        this.defaultType = type;
    }

    /**
     * Erstellt ein Objekt des angegebenen Typs
     */
    createByType(type: string, config?: C): T {
        const creator = this.creators.get(type);
        if (!creator) {
            throw new Error(`Unbekannter Typ: ${type}`);
        }
        return creator(config);
    }

    /**
     * Erstellt ein Objekt des Standard-Typs
     */
    create(config?: C): T {
        if (!this.defaultType) {
            throw new Error("Kein Standard-Typ gesetzt");
        }
        return this.createByType(this.defaultType, config);
    }

    /**
     * Gibt alle registrierten Typen zurück
     */
    getTypes(): string[] {
        return Array.from(this.creators.keys());
    }

    /**
     * Prüft ob ein Typ registriert ist
     */
    hasType(type: string): boolean {
        return this.creators.has(type);
    }
}
