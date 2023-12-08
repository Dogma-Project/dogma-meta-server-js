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
  const keyType = type as C_Keys.Type;
  const keyLength = length as 1024 | 2048 | 4096;
  const keyName = name as string;
  let keyEvent: C_Event.Type;
  try {
    switch (keyType) {
      case C_Keys.Type.masterKey:
        keyEvent = C_Event.Type.masterKey;
        State.storage.user.name = keyName;
        break;
      case C_Keys.Type.nodeKey:
        keyEvent = C_Event.Type.nodeKey;
        State.storage.node.name = keyName;
        break;
      default:
        return next(
          new ClientError({
            status: CLIENT_STATUSES.BAD_REQUEST,
            code: ERRORS.UNKNOWN_KEY_TYPE,
            payload: { type },
          })
        );
    }
    const keyState = State.stateManager.state[keyEvent];
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

    await Keys.createKeyPair(keyType, prefix, keyLength);
    State.stateManager.emit(keyEvent, C_System.States.ready);
    return res.json({
      result: true,
    });
  } catch (err) {
    return next(err);
  }
}
