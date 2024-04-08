import { Socket } from "socket.io";
import { RunWorker } from "@dogma-project/core-meta";
import { API } from "@dogma-project/core-meta/declarations/types";
import ManagerController from "./manager";

let connections: Socket[] = [];
const instances: {
  [key: string]: RunWorker;
} = {};

export default function ConnectionController(socket: Socket) {
  socket.on(
    "manager",
    (
      data: Omit<API.Request, "id">,
      cb: (result: Omit<API.Response, "id">) => void
    ) => {
      ManagerController.call(socket, data, cb, instances);
    }
  );
  socket.on(
    "request",
    (
      params: { prefix: string; data: Omit<API.Request, "id"> },
      cb: (result: Omit<API.Response, "id">) => void,
      errCb?: (result: API.ResponseError) => void
    ) => {
      const instance = instances[params.prefix];
      if (instance) {
        instance
          .request(params.data)
          .then(cb)
          .catch((err: API.ResponseError) => {
            errCb && errCb(err);
          });
      } else {
        // errCb && errCb({
        // });
      }
    }
  );
  socket.on(
    "push",
    (params: { prefix: string; data: Omit<API.Request, "id"> }) => {
      const instance = instances[params.prefix];
      if (instance) {
        console.debug("INSTANCE SEND", params.data);
        instance.send(params.data);
      } else {
        // offline
      }
    }
  );
  socket.on("disconnect", (a) => {
    connections = connections.filter((c) => c.id === socket.id);
  });
  connections.push(socket);
}
