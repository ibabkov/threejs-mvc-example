import { Euler, Vector3 } from 'three';

import { BaseModel } from './BaseModel';
import  type { SceneObjectEvents } from '../types/events';
import type { MapColorPropertiesToColorRepresentations } from 'three/src/materials/Material';


export class SceneObjectModel<T = Partial<MapColorPropertiesToColorRepresentations<{}>>> extends BaseModel<SceneObjectEvents> {
  public readonly id;
  _position: Vector3;
  _rotation: Euler;
  _scale: Vector3;
  _material: Partial<MapColorPropertiesToColorRepresentations<T>>;

  constructor(
    id: string,
    material: Partial<MapColorPropertiesToColorRepresentations<T>> = {}
  ) {
    super();
    this.id = id;
    this._position = new Vector3(0, 0, 0);
    this._rotation = new Euler(0, 0, 0);
    this._scale = new Vector3(1, 1, 1);
    this._material = { ...material };
  }

  public get position(): Vector3 { return this._position; }

  public get rotation(): Euler { return this._rotation; }

  public get scale(): Vector3 { return this._scale; }

  public get material(): Partial<MapColorPropertiesToColorRepresentations<T>> { return this._material; }
}
