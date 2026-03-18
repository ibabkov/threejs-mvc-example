import type { InputModel } from '../models/InputModel';

export class InputController {
  private inputModel: InputModel;
  private domElement: HTMLElement;

  constructor(inputModel: InputModel, domElement: HTMLElement) {
    this.inputModel = inputModel;
    this.domElement = domElement;

    this.setupListeners();
  }

  private handlePointer = (e: PointerEvent) => {
    if (!e.isPrimary || !(e.currentTarget instanceof HTMLElement)) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    this.inputModel.update(x, y);
  }

  private setupListeners() {
    this.domElement.addEventListener('pointermove', this.handlePointer);
    this.domElement.addEventListener('pointerdown', this.handlePointer);
  }
}
