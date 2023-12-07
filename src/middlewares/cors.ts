import { NextFunction, Request, Response } from "express";

export default function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // edit
  res.setHeader("Access-Control-Allow-Headers", "*"); // edit
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
}
