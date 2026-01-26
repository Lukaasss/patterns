/**
 * Singleton Pattern
 * 
 * Das Singleton Pattern stellt sicher, dass eine Klasse nur eine Instanz hat
 * und bietet einen globalen Zugriffspunkt auf diese Instanz.
 * 
 * Vorteile:
 * - Kontrollierter Zugriff auf die einzige Instanz
 * - Reduzierter Namensraum (keine globalen Variablen)
 * - Lazy Initialization möglich
 * - Kann erweitert werden (Subklassen)
 * 
 * Verwendung:
 * const instance = Singleton.getInstance();
 */

/**
 * Generische Singleton-Basisklasse
 * Kann als Basis für Singleton-Implementierungen verwendet werden
 */
export abstract class SingletonBase {
    protected static instances: Map<string, SingletonBase> = new Map();

    protected constructor() {
        // Protected constructor verhindert direkte Instanziierung
    }
}

/**
 * Decorator für Singleton Pattern
 * Kann verwendet werden um Klassen zu Singletons zu machen
 */
export function Singleton<T extends { new(...args: any[]): {} }>(constructor: T) {
    let instance: T | null = null;

    return class extends constructor {
        constructor(...args: any[]) {
            if (instance) {
                return instance as any;
            }
            super(...args);
            instance = this as any;
        }
    } as T;
}

/**
 * Helper-Funktion zum Erstellen von Singleton-Instanzen
 */
export function createSingleton<T>(factory: () => T): () => T {
    let instance: T | null = null;

    return () => {
        if (instance === null) {
            instance = factory();
        }
        return instance;
    };
}
