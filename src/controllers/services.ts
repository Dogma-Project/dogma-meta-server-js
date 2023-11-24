import { Request, Response, NextFunction } from "express";

export function getServices(req: Request, res: Response, next: NextFunction) {
  res.json(["ser1", "ser2"]);
}
