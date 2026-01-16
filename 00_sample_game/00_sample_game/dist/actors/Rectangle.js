import { StraightMovement } from "./StraightMovement.js";
import { SineMovement } from "./SineMovement.js";
import { ZigZagMovement } from "./ZigZagMovement.js";
// Bewegungsmuster: 0 = Gerade->Sinus, 1 = Sinus->Gerade, 2 = ZigZag->Gerade, 3 = Gerade->ZigZag
export class Rectangle {
    constructor(x = 100) {
        this.y = 0;
        this.speedMultiplier = 1;
        this.currentX = 0;
        this.switchedMovement = false;
        this.reachedBottom = false;
        // Zufällige Geschwindigkeit zwischen 50 und 180
        this.speed = Math.floor(Math.random() * 130) + 50;
        this.startX = x;
        // Zufälliges Bewegungsmuster
        this.pattern = Math.floor(Math.random() * 4);
        this.straightMovement = new StraightMovement(x);
        this.sineMovement = new SineMovement(x, 60 + Math.random() * 60, 0.015 + Math.random() * 0.02);
        this.zigZagMovement = new ZigZagMovement(x, 100 + Math.random() * 100, 30 + Math.random() * 40);
    }
    move(delta) {
        this.reachedBottom = false;
        this.y += this.speed * this.speedMultiplier * delta;
        // ZigZag braucht delta für Bewegung
        if ((this.pattern === 2 && this.y < 300) || (this.pattern === 3 && this.y >= 300)) {
            this.zigZagMovement.calculateX(this.y, delta);
        }
        if (this.y > 600) {
            this.y = 0;
            this.straightMovement.reset();
            this.sineMovement.reset();
            this.zigZagMovement.reset();
            this.switchedMovement = false;
            this.reachedBottom = true;
        }
    }
    hasReachedBottom() {
        return this.reachedBottom;
    }
    render(ctx) {
        let x;
        switch (this.pattern) {
            case 0: // Gerade -> Sinus
                x = this.y < 300 ? this.straightMovement.calculateX(this.y) : this.sineMovement.calculateX(this.y);
                break;
            case 1: // Sinus -> Gerade
                if (this.y < 300) {
                    x = this.sineMovement.calculateX(this.y);
                }
                else {
                    if (!this.switchedMovement) {
                        this.straightMovement = new StraightMovement(this.sineMovement.calculateX(300));
                        this.switchedMovement = true;
                    }
                    x = this.straightMovement.calculateX(this.y);
                }
                break;
            case 2: // ZigZag -> Gerade
                if (this.y < 300) {
                    x = this.zigZagMovement.getCurrentX();
                }
                else {
                    if (!this.switchedMovement) {
                        this.straightMovement = new StraightMovement(this.zigZagMovement.getCurrentX());
                        this.switchedMovement = true;
                    }
                    x = this.straightMovement.calculateX(this.y);
                }
                break;
            case 3: // Gerade -> ZigZag
            default:
                x = this.y < 300 ? this.straightMovement.calculateX(this.y) : this.zigZagMovement.getCurrentX();
                break;
        }
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(x, this.y, 50, 50);
        this.currentX = x;
    }
    getPosition() {
        return { x: this.currentX, y: this.y };
    }
    reset() {
        this.y = 0;
        // Neue zufällige Position
        const newX = Math.floor(Math.random() * 450) + 50;
        this.startX = newX;
        this.straightMovement = new StraightMovement(newX);
        this.sineMovement = new SineMovement(newX, 60 + Math.random() * 60, 0.015 + Math.random() * 0.02);
        this.zigZagMovement = new ZigZagMovement(newX, 100 + Math.random() * 100, 30 + Math.random() * 40);
        this.switchedMovement = false;
    }
    setSpeedMultiplier(multiplier) {
        this.speedMultiplier = multiplier;
    }
}
