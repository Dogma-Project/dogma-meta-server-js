import { Request, Response, NextFunction } from "express";
import { Model, State, Types } from "@dogma-project/core-meta";
import ClientError from "../helpers/clientError";
import { CLIENT_STATUSES, ERRORS } from "../constants";

const { Event } = Types;

export function getConfig(req: Request, res: Response, next: NextFunction) {
  res.json({
    [Event.Type.configRouter]:
      State.stateManager.state[Event.Type.configRouter],
    [Event.Type.configDhtLookup]:
      State.stateManager.state[Event.Type.configDhtLookup],
    [Event.Type.configDhtAnnounce]:
      State.stateManager.state[Event.Type.configDhtAnnounce],
    [Event.Type.configDhtBootstrap]:
      State.stateManager.state[Event.Type.configDhtBootstrap],
    [Event.Type.configAutoDefine]:
      State.stateManager.state[Event.Type.configAutoDefine],
    [Event.Type.configExternal]:
      State.stateManager.state[Event.Type.configExternal],
    [Event.Type.configLocalDiscovery]:
      State.stateManager.state[Event.Type.configLocalDiscovery],
    [Event.Type.configPublicIpV4]:
      State.stateManager.state[Event.Type.configPublicIpV4],
  });
}

export function setConfig(req: Request, res: Response, next: NextFunction) {
  let count = 0;
  if (Event.Type.configRouter in req.body) {
    count++;
    Model.configModel.persistConfig({
      param: Event.Type.configRouter,
      value: Number(req.body[Event.Type.configRouter]),
    });
  }
  if (Event.Type.configDhtAnnounce in req.body) {
    count++;
    Model.configModel.persistConfig({
      param: Event.Type.configDhtAnnounce,
      value: Number(req.body[Event.Type.configDhtAnnounce]),
    });
  }
  if (Event.Type.configDhtLookup in req.body) {
    count++;
    Model.configModel.persistConfig({
      param: Event.Type.configDhtLookup,
      value: Number(req.body[Event.Type.configDhtLookup]),
    });
  }
  if (Event.Type.configDhtBootstrap in req.body) {
    count++;
    Model.configModel.persistConfig({
      param: Event.Type.configDhtBootstrap,
      value: Number(req.body[Event.Type.configDhtBootstrap]),
    });
  }
  if (Event.Type.configAutoDefine in req.body) {
    count++;
    Model.configModel.persistConfig({
      param: Event.Type.configAutoDefine,
      value: !!req.body[Event.Type.configAutoDefine],
    });
  }
  if (Event.Type.configLocalDiscovery in req.body) {
    count++;
    Model.configModel.persistConfig({
      param: Event.Type.configLocalDiscovery,
      value: !!req.body[Event.Type.configLocalDiscovery],
    });
  }
  if (Event.Type.configExternal in req.body) {
    count++;
    Model.configModel.persistConfig({
      param: Event.Type.configExternal,
      value: String(req.body[Event.Type.configExternal]),
    });
  }
  if (Event.Type.configPublicIpV4 in req.body) {
    count++;
    Model.configModel.persistConfig({
      param: Event.Type.configPublicIpV4,
      value: String(req.body[Event.Type.configPublicIpV4]),
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
