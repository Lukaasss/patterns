/**
 * Gerade-Bewegungsstrategie
 * Bewegt das Objekt in einer geraden Linie nach unten
 */
export class StraightMovement {
    constructor(startX) {
        this.startX = startX;
        this.x = startX;
    }
    calculateX(y, delta) {
        return this.x;
    }
    getCurrentX() {
        return this.x;
    }
    reset() {
        this.x = this.startX;
    }
    setStartX(x) {
        this.startX = x;
        this.x = x;
    }
}
