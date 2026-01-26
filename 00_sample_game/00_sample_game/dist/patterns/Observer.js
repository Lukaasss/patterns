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
 * Abstrakte Observable-Klasse
 * Basis-Implementierung für Subjects
 */
export class Observable {
    constructor() {
        this.observers = [];
    }
    subscribe(observer) {
        if (this.observers.indexOf(observer) === -1) {
            this.observers.push(observer);
        }
    }
    unsubscribe(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}
/**
 * Event-basiertes Observer System
 * Ermöglicht das Registrieren von Callbacks für bestimmte Events
 */
export class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }
    /**
     * Registriert einen Listener für ein Event
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(callback);
    }
    /**
     * Entfernt einen Listener für ein Event
     */
    off(event, callback) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.delete(callback);
        }
    }
    /**
     * Löst ein Event aus und benachrichtigt alle Listener
     */
    emit(event, data) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }
    /**
     * Registriert einen einmaligen Listener
     */
    once(event, callback) {
        const onceCallback = (data) => {
            callback(data);
            this.off(event, onceCallback);
        };
        this.on(event, onceCallback);
    }
    /**
     * Entfernt alle Listener für ein Event oder alle Events
     */
    removeAllListeners(event) {
        if (event) {
            this.listeners.delete(event);
        }
        else {
            this.listeners.clear();
        }
    }
}
