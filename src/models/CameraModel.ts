import { Vector3 } from 'three';

import { BaseModel } from './BaseModel';

export class CameraModel extends BaseModel {
  private _position: Vector3  = new Vector3(0, 0, 5);
  private _fov: number = 70;
  private _near: number = 0.1;
  private _far: number = 10;

  constructor() { super(); }

  public get position() { return this._position; }

  public get fov() { return this._fov; }

  public get near() { return this._near; }

  public get far() { return this._far; }
}
