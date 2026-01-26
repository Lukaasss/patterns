/**
 * Design Patterns - Index
 * 
 * Zentrale Export-Datei für alle Design Patterns
 */

// Singleton Pattern
export { SingletonBase, Singleton, createSingleton } from "./Singleton.js";

// Observer Pattern
export { Observer, Subject, Observable, EventEmitter } from "./Observer.js";

// Factory Pattern
export { Factory, AbstractFactory, RegistryFactory } from "./Factory.js";

// Strategy Pattern
export { Strategy, StrategyContext, MovementStrategy } from "./Strategy.js";
