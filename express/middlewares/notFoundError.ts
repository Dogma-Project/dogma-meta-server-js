import { Request, Response, NextFunction } from "express";
import { ERRORS, CLIENT_STATUSES } from "../constants";

export default function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(CLIENT_STATUSES.NOT_FOUND).json({
    status: CLIENT_STATUSES.NOT_FOUND,
    code: ERRORS.PAGE_NOT_FOUND,
    name: "Path not found",
    payload: {
      message: "Path not found",
    },
  });
}
