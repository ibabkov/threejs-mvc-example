import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

import { SceneObjectView } from './SceneObjectView';
import { CubeModel } from '../models/CubeModel';

export class CubeView extends SceneObjectView<CubeModel> {
  constructor(model: CubeModel) {
    super(model);
  }

  protected createMesh() {
    const geometry = new BoxGeometry(this.model.size, this.model.size, this.model.size);
    const material = new MeshBasicMaterial({
      color: this.model.material.color,
      wireframe: this.model.material.wireframe,
    });
    this.mesh = new Mesh(geometry, material);
  }
}
