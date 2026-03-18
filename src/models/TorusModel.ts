import type { MeshStandardMaterial } from 'three';

import { SceneObjectModel } from './SceneObjectModel';

export class TorusModel extends SceneObjectModel<MeshStandardMaterial> {
  private _radius: number = 0.3;
  private _tube: number = 0.08;
  private _tubularSegments: number = 128;
  private _radialSegments: number = 16;

  constructor(id: string) {
    super(id, {
      color: '#4e8ab3',
      metalness: 1,
      roughness: 0.1
    });
  }

  public get radius() { return this._radius; }

  public get tube() { return this._tube; }

  public get tubularSegments() { return this._tubularSegments; }

  public get radialSegments() { return this._radialSegments; }
}
