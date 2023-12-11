// import { C_Event, C_System } from "@dogma-project/constants-meta";
// import { State } from "@dogma-project/core-meta";
// import { NextFunction, Request, Response } from "express";
// import { CLIENT_STATUSES, ERRORS } from "../constants";
// import ClientError from "../helpers/clientError";

// export default function mainDbsMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const services = State.stateManager.state[C_Event.Type.services];
//   if (!services) {
//     return next(
//       new ClientError({
//         status: CLIENT_STATUSES.ERROR,
//         code: ERRORS.CORE_NOT_READY,
//       })
//     );
//   }

//   const usersDb = State.stateManager.state[C_Event.Type.usersDb];
//   const nodesDb = State.stateManager.state[C_Event.Type.nodesDb];
//   const configDb = State.stateManager.state[C_Event.Type.configDb];
//   if (
//     usersDb !== C_System.States.full ||
//     nodesDb !== C_System.States.full ||
//     configDb !== C_System.States.full
//   ) {
//     return next(
//       new ClientError({
//         status: CLIENT_STATUSES.ERROR,
//         code: ERRORS.CORE_DB_NOT_READY,
//       })
//     );
//   }

//   return next();
// }
