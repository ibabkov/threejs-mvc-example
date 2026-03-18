import { EventDispatcher } from 'three';

export class BaseModel<TEventMap extends {} = {}> extends EventDispatcher<TEventMap> {
  constructor() { super(); }
}
