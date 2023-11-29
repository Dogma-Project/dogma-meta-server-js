import { Request, Response, NextFunction } from "express";
import { State, Types, Model, Keys } from "@dogma-project/core";
import ClientError from "../helpers/clientError";
import { CLIENT_STATUSES, ERRORS } from "../constants";

export async function createKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { length, name, type } = req.body;
  // add validation
  const prefix = State.stateManager.state[Types.Event.Type.prefix] || "default";
  try {
    if (type === "master") {
      const keyState = State.stateManager.state[Types.Event.Type.masterKey];
      if (!keyState || keyState > Types.System.States.empty) {
        return next(
          new ClientError({
            status: CLIENT_STATUSES.BAD_REQUEST,
            code: ERRORS.KEY_IS_NOT_EMPTY,
            payload: {
              state: keyState,
            },
          })
        );
      }
      State.storage.user.name = name;
      await Keys.createKeyPair(Types.Keys.Type.masterKey, prefix, length);
      State.stateManager.emit(
        Types.Event.Type.masterKey,
        Types.System.States.ready
      );
    } else if (type === "node") {
      const keyState = State.stateManager.state[Types.Event.Type.nodeKey];
      if (!keyState || keyState > Types.System.States.empty) {
        return next(
          new ClientError({
            status: CLIENT_STATUSES.BAD_REQUEST,
            code: ERRORS.KEY_IS_NOT_EMPTY,
            payload: {
              state: keyState,
            },
          })
        );
      }
      State.storage.node.name = name;
      await Keys.createKeyPair(Types.Keys.Type.nodeKey, prefix, length);
      State.stateManager.emit(
        Types.Event.Type.nodeKey,
        Types.System.States.ready
      );
    } else {
      return next(
        new ClientError({
          status: CLIENT_STATUSES.BAD_REQUEST,
          code: ERRORS.UNKNOWN_KEY_TYPE,
          payload: { type },
        })
      );
    }
    return res.json({
      result: true,
    });
  } catch (err) {
    return next(err);
  }
}
