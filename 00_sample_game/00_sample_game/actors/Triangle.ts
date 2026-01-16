import { Actor } from "./Actor.js";
import { ZigZagMovement } from "./ZigZagMovement.js";
import { StraightMovement } from "./StraightMovement.js";

export class Triangle implements Actor {
    private x: number;
    private y: number = 0;
    private speed: number = 120; // Pixel pro Sekunde
    private zigZagMovement: ZigZagMovement;
    private straightMovement: StraightMovement | null = null;
    private xAtMiddle: number = 0;

    constructor(x: number = 250) {
        this.x = x;
        this.zigZagMovement = new ZigZagMovement(x, 150, 50);
    }

    move(delta: number): void {
        this.y += this.speed * delta;

        // Erste Hälfte: Zickzack-Bewegung
        if (this.y < 300) {
            this.x = this.zigZagMovement.calculateX(this.y, delta);
        }
        // Bei y=300 die aktuelle X-Position speichern
        else if (this.straightMovement === null) {
            this.xAtMiddle = this.zigZagMovement.getCurrentX();
            this.straightMovement = new StraightMovement(this.xAtMiddle);
        }

        // Von oben neu starten
        if (this.y > 600) {
            this.y = 0;
            this.x = this.zigZagMovement.getCurrentX();
            this.zigZagMovement.reset();
            this.straightMovement = null;
            this.xAtMiddle = 0;
        }
    }

    render(ctx: CanvasRenderingContext2D): void {
        let x: number;

        if (this.y < 300) {
            x = this.zigZagMovement.getCurrentX();
        } else {
            x = this.straightMovement!.calculateX(this.y);
        }

        ctx.fillStyle = '#00FF00'; // Farbe (grün)
        ctx.beginPath();
        ctx.moveTo(x + 25, this.y); // Spitze oben
        ctx.lineTo(x, this.y + 50); // Unten links
        ctx.lineTo(x + 50, this.y + 50); // Unten rechts
        ctx.closePath();
        ctx.fill();
    }
}
