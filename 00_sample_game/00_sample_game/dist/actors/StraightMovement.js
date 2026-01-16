export class StraightMovement {
    constructor(startX) {
        this.startX = startX;
        this.x = startX;
    }
    calculateX(y) {
        return this.startX;
    }
    reset() {
        this.x = this.startX;
    }
}
