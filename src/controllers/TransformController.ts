import type { SceneModel } from '../models/SceneModel';
import type { InputModel } from '../models/InputModel';
import { CubeModel } from '../models/CubeModel';
import { TorusModel } from '../models/TorusModel';

export class TransformController {
  private sceneModel: SceneModel;
  private inputModel: InputModel;

  constructor(sceneModel: SceneModel, inputModel: InputModel) {
    this.sceneModel = sceneModel;
    this.inputModel = inputModel;

    this.setupListeners();
  }

  private setupListeners() {
    this.inputModel.addEventListener('input-changed', ({ position }) => {
      const objects = this.sceneModel.getAll();
      objects.forEach((obj) => {
        const rotation = obj.rotation;
        if (obj instanceof CubeModel) {
          rotation.y = position.x * Math.PI;
          obj.dispatchEvent({ type: 'rotation-changed', rotation });
        } else if (obj instanceof TorusModel) {
          rotation.x = position.y * Math.PI;
          obj.dispatchEvent({ type: 'rotation-changed', rotation });
        }
      });
    });
  }
}
