import { NextFunction, Request, Response } from "express";

export default function portMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const port = global.apiport;
  res.setHeader("Dogma-Meta-Api-Port", port);
  res.cookie("dogma-api-port", port, { maxAge: 90000, sameSite: "strict" });
  next();
}
