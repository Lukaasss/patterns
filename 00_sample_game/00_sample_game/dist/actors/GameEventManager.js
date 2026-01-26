import { EventEmitter } from "../patterns/Observer.js";
/**
 * GameEventManager - Singleton für das zentrale Event-System
 *
 * Verwendet das Observer Pattern um lose Kopplung zwischen
 * Spielkomponenten zu ermöglichen.
 */
class GameEventManagerClass extends EventEmitter {
    constructor() {
        super();
    }
    /**
     * Singleton-Zugriff
     */
    static getInstance() {
        if (!GameEventManagerClass._instance) {
            GameEventManagerClass._instance = new GameEventManagerClass();
        }
        return GameEventManagerClass._instance;
    }
    /**
     * Logging für Debug-Zwecke
     */
    enableLogging() {
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
GameEventManagerClass._instance = null;
/**
 * Singleton-Export
 */
export const GameEventManager = GameEventManagerClass.getInstance();
