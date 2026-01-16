import { StraightMovement } from "./StraightMovement.js";
import { SineMovement } from "./SineMovement.js";
export class Rectangle {
    constructor(x = 100) {
        this.y = 0;
        this.speed = 100; // Pixel pro Sekunde
        this.straightMovement = new StraightMovement(x);
        this.sineMovement = new SineMovement(x, 80, 0.02);
    }
    move(delta) {
        this.y += this.speed * delta;
        if (this.y > 600) {
            this.y = 0;
            this.straightMovement.reset();
            this.sineMovement.reset();
        }
    }
    render(ctx) {
        let x;
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
