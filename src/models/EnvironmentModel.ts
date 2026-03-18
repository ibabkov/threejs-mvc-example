import { BaseModel } from './BaseModel';

export class EnvironmentModel extends BaseModel {
  private _backgroundColor = '#0d1117';
  private _textureURL = new URL('../assets/env_1k.hdr', import.meta.url);

  constructor() { super(); }

  public get backgroundColor() { return this._backgroundColor; }

  public get textureURL() { return this._textureURL.toString(); }
}
