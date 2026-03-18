import type { SceneObjectModel } from './SceneObjectModel';
import { BaseModel } from './BaseModel';
import type { SceneModelEvents } from '../types/events';

export class SceneModel extends BaseModel<SceneModelEvents> {
  private _objects: Map<string, SceneObjectModel> = new Map();

  constructor() { super(); }

  add(object: SceneObjectModel, parent?: SceneObjectModel) {
    this._objects.set(object.id, object);
    this.dispatchEvent({ type: 'object-added', object, parent });
  }

  get(id: string): SceneObjectModel | undefined {
    return this._objects.get(id);
  }

  getAll(): SceneObjectModel[] {
    return Array.from(this._objects.values());
  }
}
