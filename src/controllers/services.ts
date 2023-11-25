import { Request, Response, NextFunction } from "express";
import { State, Types } from "@dogma-project/core";

export function getServices(req: Request, res: Response, next: NextFunction) {
  const services = State.stateManager.state[Types.Event.Type.services];
  res.json(services);
}
