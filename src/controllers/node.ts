import { Request, Response, NextFunction } from "express";
import { State, Types } from "@dogma-project/core-meta";

export function getSelfNode(req: Request, res: Response, next: NextFunction) {
  const { id, name } = State.storage.node;
  res.json({ id, name });
}
