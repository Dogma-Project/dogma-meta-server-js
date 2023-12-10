import { Request, Response, NextFunction } from "express";
import { State, Connections, Model } from "@dogma-project/core-meta";
// import { broadcast } from "./events";

export async function getNetwork(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const own_user_id = State.storage.user.id;
  const own_node_id = State.storage.node.id;

  try {
    const users = await Model.userModel.getAll();
    const nodes = await Model.nodeModel.getAll();

    const result: any[] = []; // edit

    users.forEach((user) => {
      result.push({
        id: user.user_id,
        name: user.name,
        current: own_user_id && own_user_id === user.user_id,
        nodes: [],
      });
    });
    nodes.forEach((node) => {
      const user = result.find((u) => u.id === node.user_id);
      if (user)
        user.nodes.push({
          id: node.node_id,
          name: node.name,
          current: own_node_id && own_node_id === node.node_id,
          online: Connections.isNodeOnline(node.node_id),
        });
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getOnline() {
  //
}

// State.stateManager.subscribe([C_Event.Type.services], ([services]) => {
//   broadcast("services", services);
// });
