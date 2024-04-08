import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

import { API } from "@dogma-project/core-meta/declarations/types";
import { RunWorker, Constants } from "@dogma-project/core-meta";
import { Socket } from "socket.io";

const { C_API, C_System } = Constants;

export default function ManagerController(
  this: Socket,
  data: Omit<API.Request, "id">,
  cb: (result: Omit<API.Response, "id">) => void,
  instances: {
    [key: string]: RunWorker;
  }
) {
  switch (data.type) {
    case C_API.ApiRequestType.prefix:
      switch (data.action) {
        case C_API.ApiRequestAction.set:
          if (data.payload && data.payload.prefix) {
            // add validation
            const { prefix } = data.payload;
            this.join("instance-" + prefix);
            if (prefix in instances)
              return cb({
                type: C_API.ApiRequestType.prefix,
                action: C_API.ApiRequestAction.result,
                payload: {
                  result: false,
                  id: instances[prefix].getId(),
                  message: "Already running",
                },
              });
            const worker = new RunWorker({
              prefix,
              loglevel: C_System.LogLevel.debug,
            });
            worker.on("notify", (payload) => {
              this.emit("notify", payload);
              this.to("instance-" + prefix).emit("notify", payload); // check
            });
            worker.on("exit", () => {
              delete instances[prefix];
              console.log("Instance", prefix, "has stopped");
            });
            instances[prefix] = worker;
            cb({
              type: C_API.ApiRequestType.prefix,
              action: C_API.ApiRequestAction.result,
              payload: {
                result: true,
                id: worker.getId(),
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
    default:
      // not supported
      break;
  }
}
