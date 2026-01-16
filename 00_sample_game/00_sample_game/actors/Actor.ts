export interface Actor {
  move(delta: number): void;
  render(ctx: CanvasRenderingContext2D): void;
  hasReachedBottom(): boolean;
  getPosition(): { x: number; y: number };
  reset(): void;
  setSpeedMultiplier(multiplier: number): void;
}
