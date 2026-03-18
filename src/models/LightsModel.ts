import { Vector3 } from 'three';

import { BaseModel } from './BaseModel';

export class LightsModel extends BaseModel {
  private _ambientLightColor = '#ffffff';
  private _ambientLightIntensity = 2;
  private _directionalLightColor = '#ffffff';
  private _directionalLightIntensity = 2;
  private _directionalLightPosition = new Vector3(2, 2, 2);

  constructor() { super(); }

  public get ambientLightColor() { return this._ambientLightColor; }

  public get ambientLightIntensity() { return this._ambientLightIntensity; }

  public get directionalLightColor() { return this._directionalLightColor; }

  public get directionalLightIntensity() { return this._directionalLightIntensity; }

  public get directionalLightPosition() { return this._directionalLightPosition; }
}
