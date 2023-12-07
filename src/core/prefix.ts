import { State, System, Types } from "@dogma-project/core-meta";

export function setPrefix(prefix: string) {
  State.stateManager.emit(Types.Event.Type.prefix, prefix);
}

export function getPrefix() {
  return State.stateManager.state[Types.Event.Type.prefix];
}
