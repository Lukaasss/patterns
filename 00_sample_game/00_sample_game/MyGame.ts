// MyGame - Example implementation of Game interface
import { Game, GameFramework } from "./GameFramework.js";
import { Rectangle } from "./actors/Rectangle.js";
import { Triangle } from "./actors/Triangle.js";
import { Circle } from "./actors/Circle.js";



class MyGame extends Game {
  private rectangle: Rectangle = new Rectangle(100);
  private triangle: Triangle = new Triangle(250);
  private circle: Circle = new Circle(400);


  init(): void {
    console.log("Game started!");
  }

  update(deltaTime: number): void {
    this.rectangle.move(deltaTime);
    this.triangle.move(deltaTime);
    this.circle.move(deltaTime);
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.rectangle.render(ctx);
    this.triangle.render(ctx);
    this.circle.render(ctx);
  }
}

const game = new MyGame();
const framework = new GameFramework(game, 600, 600);
framework.start();
console.log("test");
