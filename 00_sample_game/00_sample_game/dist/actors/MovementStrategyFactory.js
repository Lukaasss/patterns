import { SineMovement } from "./SineMovement.js";
import { StraightMovement } from "./StraightMovement.js";
import { ZigZagMovement } from "./ZigZagMovement.js";
import { CompositeMovementStrategy } from "./CompositeMovementStrategy.js";
/**
 * Enum für Bewegungstypen
 */
export var MovementType;
(function (MovementType) {
    MovementType["STRAIGHT"] = "straight";
    MovementType["SINE"] = "sine";
    MovementType["ZIGZAG"] = "zigzag";
})(MovementType || (MovementType = {}));
/**
 * Factory für Bewegungsstrategien
 *
 * Kombiniert Factory Pattern mit Strategy Pattern und Singleton Pattern
 */
export class MovementStrategyFactory {
    /**
     * Private constructor für Singleton
     */
    constructor() { }
    /**
     * Singleton-Zugriff
     */
    static getInstance() {
        if (!MovementStrategyFactory._instance) {
            MovementStrategyFactory._instance = new MovementStrategyFactory();
        }
        return MovementStrategyFactory._instance;
    }
    /**
     * Erstellt eine einzelne Bewegungsstrategie
     */
    createStrategy(type, config) {
        var _a, _b, _c, _d;
        switch (type) {
            case MovementType.STRAIGHT:
                return new StraightMovement(config.startX);
            case MovementType.SINE:
                return new SineMovement(config.startX, (_a = config.amplitude) !== null && _a !== void 0 ? _a : (60 + Math.random() * 60), (_b = config.frequency) !== null && _b !== void 0 ? _b : (0.01 + Math.random() * 0.02));
            case MovementType.ZIGZAG:
                return new ZigZagMovement(config.startX, (_c = config.horizontalSpeed) !== null && _c !== void 0 ? _c : (100 + Math.random() * 100), (_d = config.zigZagDistance) !== null && _d !== void 0 ? _d : (30 + Math.random() * 40));
            default:
                throw new Error(`Unbekannter Bewegungstyp: ${type}`);
        }
    }
    /**
     * Erstellt eine zusammengesetzte Strategie die bei switchY wechselt
     */
    createCompositeStrategy(firstType, secondType, config, switchY = 300) {
        const first = this.createStrategy(firstType, config);
        const second = this.createStrategy(secondType, config);
        return new CompositeMovementStrategy(first, second, switchY);
    }
    /**
     * Erstellt eine zufällige Composite-Strategie
     */
    createRandomCompositeStrategy(config) {
        const types = [MovementType.STRAIGHT, MovementType.SINE, MovementType.ZIGZAG];
        const firstType = types[Math.floor(Math.random() * types.length)];
        let secondType = types[Math.floor(Math.random() * types.length)];
        // Stelle sicher, dass sich die Bewegung ändert
        while (secondType === firstType) {
            secondType = types[Math.floor(Math.random() * types.length)];
        }
        return this.createCompositeStrategy(firstType, secondType, config);
    }
    /**
     * Erstellt eine zufällige einzelne Strategie
     */
    createRandomStrategy(config) {
        const types = [MovementType.STRAIGHT, MovementType.SINE, MovementType.ZIGZAG];
        const randomType = types[Math.floor(Math.random() * types.length)];
        return this.createStrategy(randomType, config);
    }
}
MovementStrategyFactory._instance = null;
/**
 * Singleton-Instanz der Factory
 * Verwendet MovementStrategyFactory.getInstance() für typsicheren Zugriff
 */
export const movementFactory = MovementStrategyFactory.getInstance();
