import { Actor } from "./Actor.js";
import { SineMovement } from "./SineMovement.js";
import { StraightMovement } from "./StraightMovement.js";
import { ZigZagMovement } from "./ZigZagMovement.js";

// Bewegungsmuster: 0 = Sinus->Gerade, 1 = Gerade->Sinus, 2 = Sinus ganz, 3 = ZigZag->Sinus
export class Circle implements Actor {
    private y: number = 0;
    private speed: number;
    private speedMultiplier: number = 1;
    private sineMovement: SineMovement;
    private straightMovement: StraightMovement;
    private zigZagMovement: ZigZagMovement;
    private startX: number;
    private currentX: number = 0;
    private pattern: number;
    private switchedMovement: boolean = false;

    constructor(x: number = 400) {
        // Zufällige Geschwindigkeit zwischen 40 und 160
        this.speed = Math.floor(Math.random() * 120) + 40;
        this.startX = x;
        // Zufälliges Bewegungsmuster
        this.pattern = Math.floor(Math.random() * 4);
        this.sineMovement = new SineMovement(x, 70 + Math.random() * 80, 0.012 + Math.random() * 0.025);
        this.straightMovement = new StraightMovement(x);
        this.zigZagMovement = new ZigZagMovement(x, 80 + Math.random() * 120, 25 + Math.random() * 45);
    }

    private reachedBottom: boolean = false;

    move(delta: number): void {
        this.reachedBottom = false;
        this.y += this.speed * this.speedMultiplier * delta;

        // ZigZag braucht delta
        if (this.pattern === 3 && this.y < 300) {
            this.zigZagMovement.calculateX(this.y, delta);
        }

        if (this.y > 600) {
            this.y = 0;
            this.sineMovement.reset();
            this.straightMovement = new StraightMovement(this.startX);
            this.zigZagMovement.reset();
            this.switchedMovement = false;
            this.reachedBottom = true;
        }
    }

    hasReachedBottom(): boolean {
        return this.reachedBottom;
    }

    render(ctx: CanvasRenderingContext2D): void {
        let x: number;

        switch (this.pattern) {
            case 0: // Sinus -> Gerade
                if (this.y < 300) {
                    x = this.sineMovement.calculateX(this.y);
                } else {
                    if (!this.switchedMovement) {
                        this.straightMovement = new StraightMovement(this.sineMovement.calculateX(300));
                        this.switchedMovement = true;
                    }
                    x = this.straightMovement.calculateX(this.y);
                }
                break;
            case 1: // Gerade -> Sinus
                x = this.y < 300 ? this.straightMovement.calculateX(this.y) : this.sineMovement.calculateX(this.y);
                break;
            case 2: // Sinus ganz
                x = this.sineMovement.calculateX(this.y);
                break;
            case 3: // ZigZag -> Sinus
            default:
                if (this.y < 300) {
                    x = this.zigZagMovement.getCurrentX();
                } else {
                    x = this.sineMovement.calculateX(this.y);
                }
                break;
        }

        ctx.fillStyle = '#0000FF';
        ctx.beginPath();
        ctx.arc(x + 25, this.y + 25, 25, 0, Math.PI * 2);
        ctx.fill();
        this.currentX = x;
    }

    getPosition(): { x: number; y: number } {
        return { x: this.currentX, y: this.y };
    }

    reset(): void {
        this.y = 0;
        // Neue zufällige Position
        const newX = Math.floor(Math.random() * 450) + 50;
        this.startX = newX;
        this.sineMovement = new SineMovement(newX, 70 + Math.random() * 80, 0.012 + Math.random() * 0.025);
        this.straightMovement = new StraightMovement(newX);
        this.zigZagMovement = new ZigZagMovement(newX, 80 + Math.random() * 120, 25 + Math.random() * 45);
        this.switchedMovement = false;
    }

    setSpeedMultiplier(multiplier: number): void {
        this.speedMultiplier = multiplier;
    }
}
