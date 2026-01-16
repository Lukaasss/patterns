// MyGame - Example implementation of Game interface
import { Game, GameFramework } from "./GameFramework.js";
import { Rectangle } from "./actors/Rectangle.js";
import { Triangle } from "./actors/Triangle.js";
import { Circle } from "./actors/Circle.js";
class MyGame extends Game {
    constructor() {
        super(...arguments);
        this.rectangle = new Rectangle(100);
        this.triangle = new Triangle(250);
        this.circle = new Circle(400);
    }
    init() {
        console.log("Game started!");
    }
    update(deltaTime) {
        this.rectangle.move(deltaTime);
        this.triangle.move(deltaTime);
        this.circle.move(deltaTime);
    }
    render(ctx) {
        this.rectangle.render(ctx);
        this.triangle.render(ctx);
        this.circle.render(ctx);
    }
}
const game = new MyGame();
const framework = new GameFramework(game, 600, 600);
framework.start();
console.log("test");
