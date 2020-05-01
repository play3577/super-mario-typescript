import { Entity, Trait } from '../Entity'
import { Level } from '../Level'
import { GameContext } from '../types'

type EmitterFn = (
  entity: Entity,
  gameContext: GameContext,
  level: Level,
) => void

export class Emitter extends Trait {
  interval = 2
  coolDown = this.interval
  emitters: EmitterFn[] = []

  update(entity: Entity, gameContext: GameContext, level: Level) {
    this.coolDown -= gameContext.deltaTime
    if (this.coolDown <= 0) {
      this.emit(entity, gameContext, level)
      this.coolDown = this.interval
    }
  }

  emit(entity: Entity, gameContext: GameContext, level: Level) {
    for (const emitter of this.emitters) {
      emitter(entity, gameContext, level)
    }
  }
}
