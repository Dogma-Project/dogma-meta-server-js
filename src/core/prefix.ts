import { State } from "@dogma-project/core-meta";
import { C_Event } from "@dogma-project/constants-meta";

export function setPrefix(prefix: string) {
  State.stateManager.emit(C_Event.Type.prefix, prefix);
}

export function getPrefix() {
  return State.stateManager.state[C_Event.Type.prefix];
}
