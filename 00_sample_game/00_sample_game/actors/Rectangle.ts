import { Actor } from "./Actor.js";
import { StraightMovement } from "./StraightMovement.js";
import { SineMovement } from "./SineMovement.js";

export class Rectangle implements Actor {
    private y: number = 0;
    private speed: number = 100; // Pixel pro Sekunde
    private straightMovement: StraightMovement;
    private sineMovement: SineMovement;

    constructor(x: number = 100) {
        this.straightMovement = new StraightMovement(x);
        this.sineMovement = new SineMovement(x, 80, 0.02);
    }

    move(delta: number): void {
        this.y += this.speed * delta;
        if (this.y > 600) {
            this.y = 0;
            this.straightMovement.reset();
            this.sineMovement.reset();
        }
    }

    render(ctx: CanvasRenderingContext2D): void {
        let x: number;

        // Erste Hälfte: gerade nach unten
        if (this.y < 300) {
            x = this.straightMovement.calculateX(this.y);
        }
        // Zweite Hälfte: Sinuskurve
        else {
            x = this.sineMovement.calculateX(this.y);
        }

        ctx.fillStyle = '#FF0000'; // Farbe (rot)
        ctx.fillRect(x, this.y, 50, 50);
    }
}
