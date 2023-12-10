import { C_Event } from "@dogma-project/constants-meta";
import { State } from "@dogma-project/core-meta";
import { NextFunction, Request, Response } from "express";
import { CLIENT_STATUSES, ERRORS } from "../constants";
import ClientError from "../helpers/clientError";

export default function prefixMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (State.stateManager.state[C_Event.Type.prefix]) {
    return next();
  } else {
    return next(
      new ClientError({
        status: CLIENT_STATUSES.ERROR,
        code: ERRORS.CORE_PREFIX_NOT_SET,
      })
    );
  }
}
