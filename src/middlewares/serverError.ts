import { Request, Response, ErrorRequestHandler } from "express";
import { SERVER_STATUSES } from "../constants";

const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: any
) => {
  const { name, message } = err;
  console.error(err); // add logging
  res.status(SERVER_STATUSES.INTERNAL_ERROR).json({
    status: SERVER_STATUSES.INTERNAL_ERROR,
    code: -1,
    name,
    payload: {
      message,
    },
  });
};

export default errorMiddleware;
