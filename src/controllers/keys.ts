import { Request, Response, NextFunction } from "express";
import { State, Keys } from "@dogma-project/core-meta";
import ClientError from "../helpers/clientError";
import { CLIENT_STATUSES, ERRORS } from "../constants";
import { C_Event, C_System, C_Keys } from "@dogma-project/constants-meta";
export async function createKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { length, name, type } = req.body;
  // add validation
  const prefix = State.stateManager.state[C_Event.Type.prefix] || "default";
  try {
    if (type === "master") {
      const keyState = State.stateManager.state[C_Event.Type.masterKey];
      if (!keyState || keyState > C_System.States.empty) {
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
      await Keys.createKeyPair(C_Keys.Type.masterKey, prefix, length);
      State.stateManager.emit(C_Event.Type.masterKey, C_System.States.ready);
    } else if (type === "node") {
      const keyState = State.stateManager.state[C_Event.Type.nodeKey];
      if (!keyState || keyState > C_System.States.empty) {
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
      await Keys.createKeyPair(C_Keys.Type.nodeKey, prefix, length);
      State.stateManager.emit(C_Event.Type.nodeKey, C_System.States.ready);
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
