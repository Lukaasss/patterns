// MyGame - Example implementation of Game interface
// Verwendet Factory Pattern, Singleton Pattern und Observer Pattern
import { Game, GameFramework } from "./GameFramework.js";
import { actorFactory } from "./actors/ActorFactory.js";
import { GameEventManager } from "./actors/GameEventManager.js";
class MyGame extends Game {
    constructor() {
        super();
        this.actors = [];
        this.counter = 0;
        this.collectedCounter = 0;
        this.speedMultiplier = 1.0;
        // Spieler-Balken
        this.playerX = 250;
        this.playerWidth = 100;
        this.playerHeight = 20;
        this.playerY = 570;
        this.playerSpeed = 400;
        // Tastatureingabe
        this.leftPressed = false;
        this.rightPressed = false;
        // Observer Pattern: Event-Listener registrieren
        this.setupEventListeners();
        // Factory Pattern + Singleton: Erstelle alle Actors über die Factory
        // Variante 1: Gemischte Gruppe mit gleicher Anzahl pro Typ
        this.actors = actorFactory.createMixedGroup(3);
        // Alternative Varianten:
        // Variante 2: Einzelne Actors erstellen
        // this.actors.push(actorFactory.createActor(ActorType.RECTANGLE));
        // this.actors.push(actorFactory.createActor(ActorType.TRIANGLE, { x: 200 }));
        // this.actors.push(actorFactory.createActor(ActorType.CIRCLE, { x: 400 }));
        // Variante 3: Mehrere eines Typs erstellen
        // this.actors.push(...actorFactory.createMultiple(ActorType.RECTANGLE, 3));
        // Variante 4: Zufällige Actors erstellen
        // for (let i = 0; i < 9; i++) {
        //   this.actors.push(actorFactory.createRandomActor());
        // }
        // Tastatur-Event-Listener
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        // Button-Event-Listener
        const fasterBtn = document.getElementById('fasterBtn');
        const slowerBtn = document.getElementById('slowerBtn');
        const speedValue = document.getElementById('speedValue');
        if (fasterBtn) {
            fasterBtn.addEventListener('click', () => {
                this.speedMultiplier = Math.min(3.0, this.speedMultiplier + 0.25);
                this.updateSpeedMultiplier();
                if (speedValue)
                    speedValue.textContent = this.speedMultiplier.toFixed(2);
            });
        }
        if (slowerBtn) {
            slowerBtn.addEventListener('click', () => {
                this.speedMultiplier = Math.max(0.25, this.speedMultiplier - 0.25);
                this.updateSpeedMultiplier();
                if (speedValue)
                    speedValue.textContent = this.speedMultiplier.toFixed(2);
            });
        }
    }
    /**
     * Observer Pattern: Registriert Event-Listener für Game-Events
     */
    setupEventListeners() {
        // Listener für verpasste Actors
        GameEventManager.on("actor:reachedBottom", (data) => {
            console.log(`Actor verpasst bei Position (${data.position.x.toFixed(0)}, ${data.position.y.toFixed(0)})`);
        });
        // Listener für eingesammelte Actors
        GameEventManager.on("actor:collected", (data) => {
            console.log(`Actor eingesammelt bei Position (${data.position.x.toFixed(0)}, ${data.position.y.toFixed(0)})`);
        });
        // Listener für Score-Updates
        GameEventManager.on("score:missed", (data) => {
            console.log(`Gesamt verpasst: ${data.count}`);
        });
        GameEventManager.on("score:collected", (data) => {
            console.log(`Gesamt eingesammelt: ${data.count}`);
        });
        // Listener für Geschwindigkeitsänderungen
        GameEventManager.on("game:speedChanged", (data) => {
            console.log(`Geschwindigkeit geändert auf: ${data.multiplier.toFixed(2)}x`);
        });
    }
    updateSpeedMultiplier() {
        this.actors.forEach(actor => actor.setSpeedMultiplier(this.speedMultiplier));
        // Observer Pattern: Event auslösen
        GameEventManager.emit("game:speedChanged", { multiplier: this.speedMultiplier });
    }
    handleKeyDown(e) {
        if (e.key === 'ArrowLeft' || e.key === 'a') {
            this.leftPressed = true;
        }
        if (e.key === 'ArrowRight' || e.key === 'd') {
            this.rightPressed = true;
        }
    }
    handleKeyUp(e) {
        if (e.key === 'ArrowLeft' || e.key === 'a') {
            this.leftPressed = false;
        }
        if (e.key === 'ArrowRight' || e.key === 'd') {
            this.rightPressed = false;
        }
    }
    getRandomX() {
        // Zufällige X-Position zwischen 50 und 500
        return Math.floor(Math.random() * 450) + 50;
    }
    init() {
        console.log("Game started!");
    }
    update(deltaTime) {
        // Spieler bewegen
        if (this.leftPressed) {
            this.playerX -= this.playerSpeed * deltaTime;
        }
        if (this.rightPressed) {
            this.playerX += this.playerSpeed * deltaTime;
        }
        // Spieler im Spielfeld halten
        if (this.playerX < 0)
            this.playerX = 0;
        if (this.playerX > 600 - this.playerWidth)
            this.playerX = 600 - this.playerWidth;
        this.actors.forEach(actor => {
            actor.move(deltaTime);
            // Kollision mit Spieler prüfen
            const pos = actor.getPosition();
            const objectBottom = pos.y + 50;
            const objectCenterX = pos.x + 25;
            // Wenn Objekt den Balken berührt
            if (objectBottom >= this.playerY &&
                pos.y < this.playerY + this.playerHeight &&
                objectCenterX >= this.playerX &&
                objectCenterX <= this.playerX + this.playerWidth) {
                this.collectedCounter++;
                // Observer Pattern: Events auslösen
                GameEventManager.emit("actor:collected", { actor, position: pos });
                GameEventManager.emit("score:collected", { count: this.collectedCounter });
                actor.reset();
            }
            // Wenn Objekt das untere Ende erreicht hat (ohne eingesammelt zu werden)
            else if (actor.hasReachedBottom()) {
                this.counter++;
                // Observer Pattern: Events auslösen
                GameEventManager.emit("actor:reachedBottom", { actor, position: pos });
                GameEventManager.emit("score:missed", { count: this.counter });
            }
        });
    }
    render(ctx) {
        this.actors.forEach(actor => actor.render(ctx));
        // Spieler-Balken zeichnen
        ctx.fillStyle = '#8B4513'; // Braun
        ctx.fillRect(this.playerX, this.playerY, this.playerWidth, this.playerHeight);
        // Counter anzeigen
        ctx.fillStyle = '#000000';
        ctx.font = '20px Arial';
        ctx.fillText(`Verpasst: ${this.counter}`, 10, 25);
        ctx.fillText(`Eingesammelt: ${this.collectedCounter}`, 10, 50);
    }
}
const game = new MyGame();
const framework = new GameFramework(game, 600, 600);
framework.start();
console.log("test");
