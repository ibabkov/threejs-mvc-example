import { Vector2 } from 'three';

import { BaseModel } from './BaseModel';
import { InputModelEvents } from '../types/events';

export class InputModel extends BaseModel<InputModelEvents> {
  private _position: Vector2;

  constructor() {
    super();
    this._position = new Vector2(0, 0);
  }

  public update(x: number, y: number) {
    this._position.set(x, y);
    this.dispatchEvent({ type: 'input-changed', position: this._position });
  }
}
