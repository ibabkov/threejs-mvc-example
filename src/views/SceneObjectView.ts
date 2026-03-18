import type { Mesh } from 'three';

import { SceneObjectModel } from '../models/SceneObjectModel';

export abstract class SceneObjectView<T extends SceneObjectModel = SceneObjectModel> {
  private _mesh!: Mesh;
  private _model: T;

  constructor(model: T) {
    this._model = model;
    this.createMesh();
    this.syncTransform();
    this.addEventListeners();
  }

  protected abstract createMesh(): void;

  get mesh(): Mesh { return this._mesh; }

  set mesh(mesh: Mesh) { this._mesh = mesh; }

  get model(): T { return this._model; }

  private syncTransform() {
    this.mesh.position.copy(this._model.position);
    this.mesh.rotation.copy(this._model.rotation);
    this.mesh.scale.copy(this._model.scale);
  }

  private addEventListeners() {
    this._model.addEventListener('rotation-changed', (event) => {
      this.mesh.rotation.set(event.rotation.x,  event.rotation.y, event.rotation.z, event.rotation.order);
    });
  }
}
