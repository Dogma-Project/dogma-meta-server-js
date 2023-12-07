import { Request, Response, NextFunction } from "express";
import { State, Types } from "@dogma-project/core-meta";

export function getSelfUser(req: Request, res: Response, next: NextFunction) {
  const { id, name } = State.storage.user;
  res.json({ id, name });
}
