import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import io, { Socket } from "socket.io";
import RunWorker from "@dogma-project/core-meta";
import { API } from "@dogma-project/core-meta/types/types";
import { C_API } from "@dogma-project/constants-meta";

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
      switch (data.type) {
        case C_API.ApiRequestType.prefix:
          switch (data.action) {
            case C_API.ApiRequestAction.set:
              if (data.payload && data.payload.prefix) {
                // add validation
                const { prefix } = data.payload;
                if (prefix in instances) return console.warn("Already running");
                socket.join("instance-" + prefix);
                const worker = new RunWorker({
                  prefix,
                });
                worker.on("notify", (payload) => {
                  socket.emit("notify", payload);
                  socket.to("instance-" + prefix).emit("notify", payload); // check
                });
                worker.on("exit", () => {
                  delete instances[prefix];
                });
                instances[prefix] = worker;
                cb({
                  type: C_API.ApiRequestType.prefix,
                  action: C_API.ApiRequestAction.result,
                  payload: {
                    result: true,
                    id: worker.id,
                  },
                });
              }
              break;
            case C_API.ApiRequestAction.delete:
              if (data.payload && data.payload.prefix) {
                const { prefix } = data.payload;
                if (!(prefix in instances)) return console.warn("Not running");
                const instance = instances[prefix];
                instance
                  .stop()
                  .then(() => {
                    cb({
                      type: C_API.ApiRequestType.prefix,
                      action: C_API.ApiRequestAction.result,
                      payload: {
                        result: true,
                      },
                    });
                  })
                  .catch(console.error);
              }
              break;
          }
          break;
        case C_API.ApiRequestType.prefixes:
          if (data.action === C_API.ApiRequestAction.get) {
            fs.readdir(path.join(os.homedir(), "/.dogma-node"), {
              withFileTypes: true,
            })
              .then((dir) =>
                dir.filter((i) => {
                  if (!i.isDirectory()) return false;
                  if (i.name.indexOf("test-") > -1) return false;
                  if (i.name.indexOf("empty-") > -1) return false;
                  return true;
                })
              )
              .then((dir) => dir.map((i) => i.name))
              .then((dirs) => {
                cb({
                  type: C_API.ApiRequestType.services, // edit !!!!
                  action: C_API.ApiRequestAction.result,
                  payload: dirs,
                });
              });
          }
          break;
      }
    }
  );
  socket.on(
    "request",
    (
      params: { prefix: string; data: Omit<API.Request, "id"> },
      cb: (result: Omit<API.Response, "id">) => void
    ) => {
      const instance = instances[params.prefix];
      if (instance) {
        instance
          .request(params.data)
          .then((res) => {
            cb(res);
          })
          .catch(console.error);
      } else {
        // offline
      }
      console.log("REQUEST", params.data);
    }
  );
  socket.on(
    "send",
    (params: { prefix: string; data: Omit<API.Request, "id"> }) => {
      const instance = instances[params.prefix];
      if (instance) {
        instance.send(params.data);
      } else {
        // offline
      }
      console.log("SEND", params.data);
    }
  );
  socket.on("disconnect", (a) => {
    connections = connections.filter((c) => c.id === socket.id);
  });
  connections.push(socket);
}
