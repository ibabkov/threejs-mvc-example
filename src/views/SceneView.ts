import {
  Scene,
  WebGLRenderer,
  Color,
  AmbientLight,
  DirectionalLight,
  EquirectangularReflectionMapping,
} from 'three';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader';

import { CubeView } from './CubeView';
import { TorusView } from './TorusView';
import type { CameraView } from './CameraView';
import type { SceneObjectView } from './SceneObjectView';
import type { SceneModel } from '../models/SceneModel';
import type { LightsModel } from '../models/LightsModel';
import type { EnvironmentModel } from '../models/EnvironmentModel';
import { CubeModel } from '../models/CubeModel';
import { TorusModel } from '../models/TorusModel';

export class SceneView {
   scene: Scene;
  private renderer: WebGLRenderer;
  private sceneModel: SceneModel;
  private cameraView: CameraView;
  private objectViews: Map<string, SceneObjectView> = new Map();

  constructor(
    sceneModel: SceneModel,
    lightsModel: LightsModel,
    environmentModel: EnvironmentModel,
    cameraView: CameraView
  ) {
    this.sceneModel = sceneModel;
    this.scene = new Scene();
    this.cameraView = cameraView;
    this.renderer = this.setupRenderer();
    this.scene = this.setupScene(environmentModel);
    this.setupLights(lightsModel);
    this.setupEnvironment(environmentModel);
    this.addEventListeners();

    document.querySelector('#app')!.appendChild(this.renderer.domElement);
  }

  private setupRenderer(): WebGLRenderer {
    const renderer = new WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    return renderer;
  }

  private setupScene(environmentModel: EnvironmentModel): Scene {
    const scene = new Scene();
    scene.background = new Color(environmentModel.backgroundColor);

    return scene;
  }

  private setupLights(lightsModel: LightsModel) {
    const ambient = new AmbientLight(lightsModel.ambientLightColor, lightsModel.ambientLightIntensity);
    this.scene.add(ambient);

    const directional = new DirectionalLight(lightsModel.directionalLightColor, lightsModel.directionalLightIntensity);
    directional.position.copy(lightsModel.directionalLightPosition);
    this.scene.add(directional);
  }

  private setupEnvironment(environmentModel: EnvironmentModel) {
    new HDRLoader().load(environmentModel.textureURL, (texture) => {
      texture.mapping = EquirectangularReflectionMapping;
      this.scene.environment = texture;
    });
  }

  private addEventListeners() {
    this.sceneModel.addEventListener('object-added', (event) => {
      let view: SceneObjectView;

      if (event.object instanceof CubeModel) {
        view = new CubeView(event.object);
      } else if (event.object instanceof TorusModel) {
        view = new TorusView(event.object);
      } else {
        return;
      }

      this.objectViews.set(event.object.id, view);
      const parentView = event.parent && this.objectViews.get(event.parent.id);
      const parent = parentView?.mesh || this.scene;
      parent.add(view.mesh);
    });
  }

  public update() {
    this.renderer.render(this.scene, this.cameraView.getCamera());
  }

  public get domElement() { return this.renderer.domElement; }
}
