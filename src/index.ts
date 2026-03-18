import { SceneModel } from './models/SceneModel';
import { CubeModel } from './models/CubeModel';
import { TorusModel } from './models/TorusModel';
import { CameraModel } from './models/CameraModel';
import { InputModel } from './models/InputModel';
import { LightsModel } from './models/LightsModel';

import { SceneView } from './views/SceneView';
import { CameraView } from './views/CameraView';

import { InputController } from './controllers/InputController';
import { TransformController } from './controllers/TransformController';
import { RenderController } from './controllers/RenderController';
import { EnvironmentModel } from './models/EnvironmentModel';
import { createBenchmark } from './benchmark';

import './styles.css';

export class Application {
  private sceneModel: SceneModel;
  private cameraModel: CameraModel;
  private inputModel: InputModel;
  private lightsModel: LightsModel;
  private environmentModel: EnvironmentModel;

  private sceneView: SceneView;
  private cameraView: CameraView;

  private inputController: InputController;
  private transformController: TransformController;
  private renderController: RenderController;
  private benchmark = createBenchmark();


  constructor() {
    // Create models
    this.sceneModel = new SceneModel();
    this.cameraModel = new CameraModel();
    this.inputModel = new InputModel();
    this.lightsModel = new LightsModel();
    this.environmentModel = new EnvironmentModel();

    // Create views
    this.cameraView = new CameraView(this.cameraModel);
    this.sceneView = new SceneView(this.sceneModel, this.lightsModel, this.environmentModel, this.cameraView);

    // Create controllers
    this.renderController = new RenderController(this.update);
    this.inputController = new InputController(
      this.inputModel,
      this.sceneView.domElement
    );
    this.transformController = new TransformController(
      this.sceneModel,
      this.inputModel,
    );

    this.spawnInitialObjects();
  }

  private update = () => {
    this.sceneView.update();
    this.benchmark.update()
  }

  private spawnInitialObjects() {
    const cube = new CubeModel('cube-1');
    const torus = new TorusModel('torus-1');

    this.sceneModel.add(cube);
    this.sceneModel.add(torus, cube);
  }

  public start() {
    this.renderController.start();
  }
}

const app = new Application();

app.start();