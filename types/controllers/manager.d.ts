import { API } from "@dogma-project/core-meta/types/types";
import RunWorker from "@dogma-project/core-meta";
import { Socket } from "socket.io";
export default function ManagerController(this: Socket, data: Omit<API.Request, "id">, cb: (result: Omit<API.Response, "id">) => void, instances: {
    [key: string]: RunWorker;
}): void;
