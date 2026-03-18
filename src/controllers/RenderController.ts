export class RenderController {
  private onRender: () => void;

  constructor(onRender: () => void) {
    this.onRender = onRender;
  }

  private update = () => {
    this.onRender();
    requestAnimationFrame(this.update);
  }

  public start() {
    this.update();
  }
}
