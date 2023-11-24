import { Request, Response, ErrorRequestHandler, NextFunction } from "express";

import ClientError from "../helpers/clientError.js";

const errorMiddleware: ErrorRequestHandler = (
  err: ClientError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ClientError) {
    const { status } = err;
    res.status(status).json(err);
  } else {
    next(err);
  }
};

export default errorMiddleware;
