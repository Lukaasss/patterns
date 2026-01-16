import { ZigZagMovement } from "./ZigZagMovement.js";
import { StraightMovement } from "./StraightMovement.js";
import { SineMovement } from "./SineMovement.js";
// Bewegungsmuster: 0 = ZigZag->Gerade, 1 = Gerade->ZigZag, 2 = Sinus->ZigZag, 3 = ZigZag->Sinus
export class Triangle {
    constructor(x = 250) {
        this.y = 0;
        this.speedMultiplier = 1;
        this.switchedMovement = false;
        this.reachedBottom = false;
        // Zufällige Geschwindigkeit zwischen 60 und 200
        this.speed = Math.floor(Math.random() * 140) + 60;
        this.x = x;
        this.startX = x;
        // Zufälliges Bewegungsmuster
        this.pattern = Math.floor(Math.random() * 4);
        this.zigZagMovement = new ZigZagMovement(x, 100 + Math.random() * 150, 30 + Math.random() * 50);
        this.straightMovement = new StraightMovement(x);
        this.sineMovement = new SineMovement(x, 50 + Math.random() * 80, 0.01 + Math.random() * 0.025);
    }
    move(delta) {
        this.reachedBottom = false;
        this.y += this.speed * this.speedMultiplier * delta;
        // ZigZag braucht delta
        if ((this.pattern === 0 && this.y < 300) ||
            (this.pattern === 1 && this.y >= 300) ||
            (this.pattern === 2 && this.y >= 300) ||
            (this.pattern === 3 && this.y < 300)) {
            this.zigZagMovement.calculateX(this.y, delta);
        }
        if (this.y > 600) {
            this.y = 0;
            this.x = this.startX;
            this.zigZagMovement.reset();
            this.straightMovement = new StraightMovement(this.startX);
            this.sineMovement.reset();
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
            case 0: // ZigZag -> Gerade
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
            case 1: // Gerade -> ZigZag
                x = this.y < 300 ? this.straightMovement.calculateX(this.y) : this.zigZagMovement.getCurrentX();
                break;
            case 2: // Sinus -> ZigZag
                if (this.y < 300) {
                    x = this.sineMovement.calculateX(this.y);
                }
                else {
                    x = this.zigZagMovement.getCurrentX();
                }
                break;
            case 3: // ZigZag -> Sinus
            default:
                if (this.y < 300) {
                    x = this.zigZagMovement.getCurrentX();
                }
                else {
                    x = this.sineMovement.calculateX(this.y);
                }
                break;
        }
        ctx.fillStyle = '#00FF00';
        ctx.beginPath();
        ctx.moveTo(x + 25, this.y);
        ctx.lineTo(x, this.y + 50);
        ctx.lineTo(x + 50, this.y + 50);
        ctx.closePath();
        ctx.fill();
        this.x = x;
    }
    getPosition() {
        return { x: this.x, y: this.y };
    }
    reset() {
        this.y = 0;
        // Neue zufällige Position
        const newX = Math.floor(Math.random() * 450) + 50;
        this.x = newX;
        this.startX = newX;
        this.zigZagMovement = new ZigZagMovement(newX, 100 + Math.random() * 150, 30 + Math.random() * 50);
        this.straightMovement = new StraightMovement(newX);
        this.sineMovement = new SineMovement(newX, 50 + Math.random() * 80, 0.01 + Math.random() * 0.025);
        this.switchedMovement = false;
    }
    setSpeedMultiplier(multiplier) {
        this.speedMultiplier = multiplier;
    }
}
