import {MathUtils, Vector3} from 'three';
import type { MeshBasicMaterialProperties } from 'three';

import { SceneObjectModel } from './SceneObjectModel';

export class CubeModel extends SceneObjectModel<MeshBasicMaterialProperties> {
  private _size = 1.5;

  constructor(id: string) {
    super(id, {
      color: '#44aaff',
      wireframe: true
    });

    this.rotation.y = MathUtils.degToRad(45);
  }

  get size() { return this._size; }
}
