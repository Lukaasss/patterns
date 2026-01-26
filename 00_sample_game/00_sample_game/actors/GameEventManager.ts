import { EventEmitter } from "../patterns/Observer.js";
import { Actor } from "./Actor.js";

/**
 * Game Events - Definiert alle möglichen Events im Spiel
 */
export interface GameEvents {
    // Actor Events
    "actor:reachedBottom": { actor: Actor; position: { x: number; y: number } };
    "actor:collected": { actor: Actor; position: { x: number; y: number } };
    "actor:reset": { actor: Actor };
    "actor:created": { actor: Actor };

    // Score Events
    "score:missed": { count: number };
    "score:collected": { count: number };

    // Game Events
    "game:started": void;
    "game:paused": void;
    "game:resumed": void;
    "game:speedChanged": { multiplier: number };
}

/**
 * GameEventManager - Singleton für das zentrale Event-System
 * 
 * Verwendet das Observer Pattern um lose Kopplung zwischen
 * Spielkomponenten zu ermöglichen.
 */
class GameEventManagerClass extends EventEmitter<GameEvents> {
    private static _instance: GameEventManagerClass | null = null;

    private constructor() {
        super();
    }

    /**
     * Singleton-Zugriff
     */
    static getInstance(): GameEventManagerClass {
        if (!GameEventManagerClass._instance) {
            GameEventManagerClass._instance = new GameEventManagerClass();
        }
        return GameEventManagerClass._instance;
    }

    /**
     * Logging für Debug-Zwecke
     */
    enableLogging(): void {
        this.on("actor:reachedBottom", (data) => {
            console.log(`[Event] Actor reached bottom at (${data.position.x}, ${data.position.y})`);
        });

        this.on("actor:collected", (data) => {
            console.log(`[Event] Actor collected at (${data.position.x}, ${data.position.y})`);
        });

        this.on("score:missed", (data) => {
            console.log(`[Event] Missed count: ${data.count}`);
        });

        this.on("score:collected", (data) => {
            console.log(`[Event] Collected count: ${data.count}`);
        });

        this.on("game:speedChanged", (data) => {
            console.log(`[Event] Speed changed to: ${data.multiplier}`);
        });
    }
}

/**
 * Singleton-Export
 */
export const GameEventManager = GameEventManagerClass.getInstance();
