import { Actor } from "./Actor.js";
import { SineMovement } from "./SineMovement.js";
import { StraightMovement } from "./StraightMovement.js";

export class Circle implements Actor {
    private y: number = 0;
    private speed: number = 80; // Pixel pro Sekunde
    private sineMovement: SineMovement;
    private straightMovement: StraightMovement | null = null;
    private xAtMiddle: number = 0;

    constructor(x: number = 400) {
        this.sineMovement = new SineMovement(x, 100, 0.02);
    }

    move(delta: number): void {
        this.y += this.speed * delta;

        // Von oben neu starten
        if (this.y > 600) {
            this.y = 0;
            this.sineMovement.reset();
            this.straightMovement = null;
            this.xAtMiddle = 0;
        }
    }

    render(ctx: CanvasRenderingContext2D): void {
        let x: number;

        // Erste Hälfte: Sinuskurve
        if (this.y < 300) {
            x = this.sineMovement.calculateX(this.y);
        }
        // Bei y=300 die aktuelle X-Position speichern
        else if (this.straightMovement === null) {
            this.xAtMiddle = this.sineMovement.calculateX(300);
            this.straightMovement = new StraightMovement(this.xAtMiddle);
            x = this.xAtMiddle;
        }
        // Zweite Hälfte: gerade nach unten
        else {
            x = this.straightMovement.calculateX(this.y);
        }

        ctx.fillStyle = '#0000FF'; // Farbe (blau)
        ctx.beginPath();
        ctx.arc(x + 25, this.y + 25, 25, 0, Math.PI * 2);
        ctx.fill();
    }
}
