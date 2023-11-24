import { Request, Response, NextFunction } from "express";
import ClientError from "../helpers/clientError";
import { CLIENT_STATUSES, ERRORS } from "../constants";
import { setPrefix, getPrefix } from "../core/prefix";

export function setPrefixHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { prefix } = req.body;
  if (typeof prefix === "string" && prefix.length) {
    setPrefix(prefix);
    res.json({
      result: true,
    });
  } else {
    next(
      new ClientError({
        status: CLIENT_STATUSES.BAD_REQUEST,
        code: ERRORS.INVALID_NODE_PREFIX,
      })
    );
  }
}

export function getPrefixHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = getPrefix();
  res.json({
    prefix: result,
  });
}
