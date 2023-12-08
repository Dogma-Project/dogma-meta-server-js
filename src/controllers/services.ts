import { Request, Response, NextFunction } from "express";
import { State } from "@dogma-project/core-meta";
import { C_Event } from "@dogma-project/constants-meta";
import { broadcast } from "./events";

export function getServices(req: Request, res: Response, next: NextFunction) {
  const services = State.stateManager.state[C_Event.Type.services];
  res.json(services);
}

State.stateManager.subscribe([C_Event.Type.services], ([services]) => {
  broadcast("services", services);
});
