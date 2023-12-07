import { Request, Response, NextFunction } from "express";
import { State, Types, Model } from "@dogma-project/core-meta";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  const result = Model.dhtModel.getAll();
  res.json(result);
}

export function announce(req: Request, res: Response, next: NextFunction) {
  //
}
