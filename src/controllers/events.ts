import { Request, Response, NextFunction } from "express";
import generateSyncId from "../helpers/get-sync-id";
import { State } from "@dogma-project/core-meta";
import { C_Event } from "@dogma-project/constants-meta";

declare global {
  namespace Express {
    export interface Request {
      dogma_id?: string;
    }
    export interface Response {
      dogma_id?: string;
    }
  }
}

let subscribers: Response<any, Record<string, any>>[] = [];

function prepare(data: any) {
  return `data: ${JSON.stringify(data)} \n\n`;
}

export default function Events(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  const id = generateSyncId(8);
  response.dogma_id = id;
  request.dogma_id = id;

  response.writeHead(200, headers);
  response.write(prepare({ result: true }));
  subscribers.push(response);

  request.on("close", () => {
    console.log(`SSE connection closed.`, request.dogma_id);
    subscribers = subscribers.filter(
      (sub) => sub.dogma_id !== request.dogma_id
    );
  });
}

export function broadcast(type: string, data: object) {
  subscribers.forEach((sub) => {
    sub.write(
      prepare({
        type,
        payload: data,
      })
    );
  });
}
