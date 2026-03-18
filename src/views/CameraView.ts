import { PerspectiveCamera } from 'three';

import type { CameraModel } from '../models/CameraModel';

export class CameraView {
  private _camera: PerspectiveCamera;
  private _model: CameraModel

  constructor(model: CameraModel) {
    this._model = model;
    this._camera = new PerspectiveCamera(
      this._model.fov,
      window.innerWidth / window.innerHeight,
      this._model.near,
      this._model.far
    );

    this._camera.position.copy(this._model.position);
  }

  public getCamera(): PerspectiveCamera {
    return this._camera;
  }
}
