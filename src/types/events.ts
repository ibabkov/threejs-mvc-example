import type { Vector2, Euler } from 'three';

import type { SceneObjectModel } from '../models/SceneObjectModel';

export type SceneObjectEvents = {
  'rotation-changed': { rotation: Euler };
}

export type InputModelEvents = {
  'input-changed': { position: Vector2 };
}

export type SceneModelEvents = {
  'object-added': { object: SceneObjectModel, parent?: SceneObjectModel };
}
