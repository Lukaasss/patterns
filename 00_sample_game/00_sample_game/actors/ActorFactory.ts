import { Actor } from "./Actor.js";
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
export enum ActorType {
    RECTANGLE = "rectangle",
    TRIANGLE = "triangle",
    CIRCLE = "circle"
}

// Konfiguration für Actor-Erstellung
export interface ActorConfig {
    x?: number;
    count?: number;
}

/**
 * Abstrakte Factory-Klasse (für Abstract Factory Pattern Erweiterung)
 */
export abstract class AbstractActorFactory {
    abstract createActor(type: ActorType, config?: ActorConfig): Actor;
    abstract createRandomActor(config?: ActorConfig): Actor;
}

/**
 * Konkrete Factory-Implementierung für Standard-Actors
 * Implementiert das Singleton Pattern
 */
export class ActorFactory extends AbstractActorFactory {
    private static _instance: ActorFactory | null = null;

    /**
     * Private constructor für Singleton
     */
    private constructor() {
        super();
    }

    /**
     * Singleton-Zugriff
     */
    static getInstance(): ActorFactory {
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
    createActor(type: ActorType, config?: ActorConfig): Actor {
        const x = config?.x ?? this.getRandomX();
        let actor: Actor;

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
    createRandomActor(config?: ActorConfig): Actor {
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
    createMultiple(type: ActorType, count: number): Actor[] {
        const actors: Actor[] = [];
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
    createMixedGroup(countPerType: number): Actor[] {
        const actors: Actor[] = [];

        actors.push(...this.createMultiple(ActorType.RECTANGLE, countPerType));
        actors.push(...this.createMultiple(ActorType.TRIANGLE, countPerType));
        actors.push(...this.createMultiple(ActorType.CIRCLE, countPerType));

        return actors;
    }

    /**
     * Generiert eine zufällige X-Position
     */
    private getRandomX(): number {
        return Math.floor(Math.random() * 450) + 50;
    }
}

/**
 * Singleton-Instanz der Factory für globalen Zugriff
 * Verwendet ActorFactory.getInstance() für typsicheren Zugriff
 */
export const actorFactory = ActorFactory.getInstance();
