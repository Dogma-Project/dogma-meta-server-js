import { Request, Response, NextFunction } from "express";
import { Model, State } from "@dogma-project/core-meta";
import ClientError from "../helpers/clientError";
import { CLIENT_STATUSES, ERRORS } from "../constants";
import { C_Event } from "@dogma-project/constants-meta";

export function getConfig(req: Request, res: Response, next: NextFunction) {
  res.json({
    [C_Event.Type.configRouter]:
      State.stateManager.state[C_Event.Type.configRouter],
    [C_Event.Type.configDhtLookup]:
      State.stateManager.state[C_Event.Type.configDhtLookup],
    [C_Event.Type.configDhtAnnounce]:
      State.stateManager.state[C_Event.Type.configDhtAnnounce],
    [C_Event.Type.configDhtBootstrap]:
      State.stateManager.state[C_Event.Type.configDhtBootstrap],
    [C_Event.Type.configAutoDefine]:
      State.stateManager.state[C_Event.Type.configAutoDefine],
    [C_Event.Type.configExternal]:
      State.stateManager.state[C_Event.Type.configExternal],
    [C_Event.Type.configLocalDiscovery]:
      State.stateManager.state[C_Event.Type.configLocalDiscovery],
    [C_Event.Type.configPublicIpV4]:
      State.stateManager.state[C_Event.Type.configPublicIpV4],
  });
}

export function setConfig(req: Request, res: Response, next: NextFunction) {
  let count = 0;
  if (C_Event.Type.configRouter in req.body) {
    count++;
    Model.configModel.persistConfig({
      param: C_Event.Type.configRouter,
      value: Number(req.body[C_Event.Type.configRouter]),
    });
  }
  if (C_Event.Type.configDhtAnnounce in req.body) {
    count++;
    Model.configModel.persistConfig({
      param: C_Event.Type.configDhtAnnounce,
      value: Number(req.body[C_Event.Type.configDhtAnnounce]),
    });
  }
  if (C_Event.Type.configDhtLookup in req.body) {
    count++;
    Model.configModel.persistConfig({
      param: C_Event.Type.configDhtLookup,
      value: Number(req.body[C_Event.Type.configDhtLookup]),
    });
  }
  if (C_Event.Type.configDhtBootstrap in req.body) {
    count++;
    Model.configModel.persistConfig({
      param: C_Event.Type.configDhtBootstrap,
      value: Number(req.body[C_Event.Type.configDhtBootstrap]),
    });
  }
  if (C_Event.Type.configAutoDefine in req.body) {
    count++;
    Model.configModel.persistConfig({
      param: C_Event.Type.configAutoDefine,
      value: !!req.body[C_Event.Type.configAutoDefine],
    });
  }
  if (C_Event.Type.configLocalDiscovery in req.body) {
    count++;
    Model.configModel.persistConfig({
      param: C_Event.Type.configLocalDiscovery,
      value: !!req.body[C_Event.Type.configLocalDiscovery],
    });
  }
  if (C_Event.Type.configExternal in req.body) {
    count++;
    Model.configModel.persistConfig({
      param: C_Event.Type.configExternal,
      value: String(req.body[C_Event.Type.configExternal]),
    });
  }
  if (C_Event.Type.configPublicIpV4 in req.body) {
    count++;
    Model.configModel.persistConfig({
      param: C_Event.Type.configPublicIpV4,
      value: String(req.body[C_Event.Type.configPublicIpV4]),
    });
  }

  if (!count) {
    return next(
      new ClientError({
        status: CLIENT_STATUSES.BAD_REQUEST,
        code: ERRORS.INVALID_PARAMS,
      })
    );
  } else {
    return res.json({ result: true, updated: count });
  }
}
