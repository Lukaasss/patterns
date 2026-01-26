import { MovementStrategy } from "../patterns/Strategy.js";
import { SineMovement } from "./SineMovement.js";
import { StraightMovement } from "./StraightMovement.js";
import { ZigZagMovement } from "./ZigZagMovement.js";
import { CompositeMovementStrategy } from "./CompositeMovementStrategy.js";

/**
 * Enum für Bewegungstypen
 */
export enum MovementType {
    STRAIGHT = "straight",
    SINE = "sine",
    ZIGZAG = "zigzag"
}

/**
 * Konfiguration für Bewegungsstrategien
 */
export interface MovementConfig {
    startX: number;
    amplitude?: number;
    frequency?: number;
    horizontalSpeed?: number;
    zigZagDistance?: number;
}

/**
 * Factory für Bewegungsstrategien
 * 
 * Kombiniert Factory Pattern mit Strategy Pattern und Singleton Pattern
 */
export class MovementStrategyFactory {
    private static _instance: MovementStrategyFactory | null = null;

    /**
     * Private constructor für Singleton
     */
    private constructor() { }

    /**
     * Singleton-Zugriff
     */
    static getInstance(): MovementStrategyFactory {
        if (!MovementStrategyFactory._instance) {
            MovementStrategyFactory._instance = new MovementStrategyFactory();
        }
        return MovementStrategyFactory._instance;
    }

    /**
     * Erstellt eine einzelne Bewegungsstrategie
     */
    createStrategy(type: MovementType, config: MovementConfig): MovementStrategy {
        switch (type) {
            case MovementType.STRAIGHT:
                return new StraightMovement(config.startX);

            case MovementType.SINE:
                return new SineMovement(
                    config.startX,
                    config.amplitude ?? (60 + Math.random() * 60),
                    config.frequency ?? (0.01 + Math.random() * 0.02)
                );

            case MovementType.ZIGZAG:
                return new ZigZagMovement(
                    config.startX,
                    config.horizontalSpeed ?? (100 + Math.random() * 100),
                    config.zigZagDistance ?? (30 + Math.random() * 40)
                );

            default:
                throw new Error(`Unbekannter Bewegungstyp: ${type}`);
        }
    }

    /**
     * Erstellt eine zusammengesetzte Strategie die bei switchY wechselt
     */
    createCompositeStrategy(
        firstType: MovementType,
        secondType: MovementType,
        config: MovementConfig,
        switchY: number = 300
    ): MovementStrategy {
        const first = this.createStrategy(firstType, config);
        const second = this.createStrategy(secondType, config);
        return new CompositeMovementStrategy(first, second, switchY);
    }

    /**
     * Erstellt eine zufällige Composite-Strategie
     */
    createRandomCompositeStrategy(config: MovementConfig): MovementStrategy {
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
    createRandomStrategy(config: MovementConfig): MovementStrategy {
        const types = [MovementType.STRAIGHT, MovementType.SINE, MovementType.ZIGZAG];
        const randomType = types[Math.floor(Math.random() * types.length)];
        return this.createStrategy(randomType, config);
    }
}

/**
 * Singleton-Instanz der Factory
 * Verwendet MovementStrategyFactory.getInstance() für typsicheren Zugriff
 */
export const movementFactory = MovementStrategyFactory.getInstance();
