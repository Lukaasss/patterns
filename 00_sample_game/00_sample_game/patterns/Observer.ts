/**
 * Observer Pattern
 * 
 * Das Observer Pattern definiert eine 1-zu-n Abhängigkeit zwischen Objekten,
 * sodass bei Zustandsänderungen eines Objekts alle abhängigen Objekte
 * automatisch benachrichtigt werden.
 * 
 * Vorteile:
 * - Lose Kopplung zwischen Subject und Observern
 * - Dynamisches Hinzufügen/Entfernen von Observern
 * - Broadcast-Kommunikation
 * 
 * Komponenten:
 * - Subject (Observable): Das beobachtete Objekt
 * - Observer: Das beobachtende Objekt
 * - ConcreteSubject: Konkrete Implementierung des Subjects
 * - ConcreteObserver: Konkrete Implementierung des Observers
 */

/**
 * Observer Interface
 * Definiert die update-Methode die aufgerufen wird wenn sich das Subject ändert
 */
export interface Observer<T> {
    update(data: T): void;
}

/**
 * Subject Interface
 * Definiert Methoden zum Verwalten von Observern
 */
export interface Subject<T> {
    subscribe(observer: Observer<T>): void;
    unsubscribe(observer: Observer<T>): void;
    notify(data: T): void;
}

/**
 * Abstrakte Observable-Klasse
 * Basis-Implementierung für Subjects
 */
export abstract class Observable<T> implements Subject<T> {
    protected observers: Observer<T>[] = [];

    subscribe(observer: Observer<T>): void {
        if (this.observers.indexOf(observer) === -1) {
            this.observers.push(observer);
        }
    }

    unsubscribe(observer: Observer<T>): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notify(data: T): void {
        this.observers.forEach(observer => observer.update(data));
    }
}

/**
 * Event-basiertes Observer System
 * Ermöglicht das Registrieren von Callbacks für bestimmte Events
 */
export class EventEmitter<EventMap extends Record<string, any>> {
    private listeners: Map<keyof EventMap, Set<(data: any) => void>> = new Map();

    /**
     * Registriert einen Listener für ein Event
     */
    on<K extends keyof EventMap>(event: K, callback: (data: EventMap[K]) => void): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(callback);
    }

    /**
     * Entfernt einen Listener für ein Event
     */
    off<K extends keyof EventMap>(event: K, callback: (data: EventMap[K]) => void): void {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.delete(callback);
        }
    }

    /**
     * Löst ein Event aus und benachrichtigt alle Listener
     */
    emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }

    /**
     * Registriert einen einmaligen Listener
     */
    once<K extends keyof EventMap>(event: K, callback: (data: EventMap[K]) => void): void {
        const onceCallback = (data: EventMap[K]) => {
            callback(data);
            this.off(event, onceCallback);
        };
        this.on(event, onceCallback);
    }

    /**
     * Entfernt alle Listener für ein Event oder alle Events
     */
    removeAllListeners(event?: keyof EventMap): void {
        if (event) {
            this.listeners.delete(event);
        } else {
            this.listeners.clear();
        }
    }
}
