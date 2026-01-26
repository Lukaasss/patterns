import { Rectangle } from "./Rectangle.js";
import { Triangle } from "./Triangle.js";
import { Circle } from "./Circle.js";
import { GameEventManager } from "./GameEventManager.js";
/**
 * Factory Pattern + Singleton Pattern für die Erstellung von Actor-Objekten.
 *
 * Das Factory Pattern kapselt die Objekterstellung und ermöglicht:
 * - Zentrale Stelle für die Erstellung aller Actor-Typen
 * - Einfache Erweiterung um neue Actor-Typen
 * - Client-Code muss konkrete Klassen nicht kennen
 * - Einheitliche Konfiguration bei der Erstellung
 *
 * Das Singleton Pattern stellt sicher:
 * - Nur eine Factory-Instanz existiert
 * - Globaler Zugriffspunkt über getInstance()
 */
// Enum für Actor-Typen
export var ActorType;
(function (ActorType) {
    ActorType["RECTANGLE"] = "rectangle";
    ActorType["TRIANGLE"] = "triangle";
    ActorType["CIRCLE"] = "circle";
})(ActorType || (ActorType = {}));
/**
 * Abstrakte Factory-Klasse (für Abstract Factory Pattern Erweiterung)
 */
export class AbstractActorFactory {
}
/**
 * Konkrete Factory-Implementierung für Standard-Actors
 * Implementiert das Singleton Pattern
 */
export class ActorFactory extends AbstractActorFactory {
    /**
     * Private constructor für Singleton
     */
    constructor() {
        super();
    }
    /**
     * Singleton-Zugriff
     */
    static getInstance() {
        if (!ActorFactory._instance) {
            ActorFactory._instance = new ActorFactory();
        }
        return ActorFactory._instance;
    }
    /**
     * Erstellt einen Actor basierend auf dem Typ
     * @param type - Der Typ des zu erstellenden Actors
     * @param config - Optionale Konfiguration
     * @returns Ein neuer Actor
     */
    createActor(type, config) {
        var _a;
        const x = (_a = config === null || config === void 0 ? void 0 : config.x) !== null && _a !== void 0 ? _a : this.getRandomX();
        let actor;
        switch (type) {
            case ActorType.RECTANGLE:
                actor = new Rectangle(x);
                break;
            case ActorType.TRIANGLE:
                actor = new Triangle(x);
                break;
            case ActorType.CIRCLE:
                actor = new Circle(x);
                break;
            default:
                throw new Error(`Unbekannter Actor-Typ: ${type}`);
        }
        // Observer Pattern: Event auslösen
        GameEventManager.emit("actor:created", { actor });
        return actor;
    }
    /**
     * Erstellt einen zufälligen Actor
     * @param config - Optionale Konfiguration
     * @returns Ein zufällig gewählter Actor
     */
    createRandomActor(config) {
        const types = [ActorType.RECTANGLE, ActorType.TRIANGLE, ActorType.CIRCLE];
        const randomType = types[Math.floor(Math.random() * types.length)];
        return this.createActor(randomType, config);
    }
    /**
     * Erstellt mehrere Actors eines Typs
     * @param type - Der Typ der zu erstellenden Actors
     * @param count - Anzahl der zu erstellenden Actors
     * @returns Array von Actors
     */
    createMultiple(type, count) {
        const actors = [];
        for (let i = 0; i < count; i++) {
            actors.push(this.createActor(type));
        }
        return actors;
    }
    /**
     * Erstellt eine gemischte Gruppe von Actors
     * @param countPerType - Anzahl pro Typ
     * @returns Array mit allen erstellten Actors
     */
    createMixedGroup(countPerType) {
        const actors = [];
        actors.push(...this.createMultiple(ActorType.RECTANGLE, countPerType));
        actors.push(...this.createMultiple(ActorType.TRIANGLE, countPerType));
        actors.push(...this.createMultiple(ActorType.CIRCLE, countPerType));
        return actors;
    }
    /**
     * Generiert eine zufällige X-Position
     */
    getRandomX() {
        return Math.floor(Math.random() * 450) + 50;
    }
}
ActorFactory._instance = null;
/**
 * Singleton-Instanz der Factory für globalen Zugriff
 * Verwendet ActorFactory.getInstance() für typsicheren Zugriff
 */
export const actorFactory = ActorFactory.getInstance();
