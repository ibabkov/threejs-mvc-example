import { TorusKnotGeometry, MeshStandardMaterial, Mesh } from 'three';

import { SceneObjectView } from './SceneObjectView';
import { TorusModel } from '../models/TorusModel';

export class TorusView extends SceneObjectView<TorusModel> {
  constructor(model: TorusModel) {
    super(model);
  }

  protected createMesh() {
    const geometry = new TorusKnotGeometry(this.model.radius, this.model.tube, this.model.tubularSegments, this.model.radialSegments);
    const material = new MeshStandardMaterial({
      color: this.model.material.color,
      metalness: this.model.material.metalness,
      roughness: this.model.material.roughness
    });
    this.mesh = new Mesh(geometry, material);
  }
}
