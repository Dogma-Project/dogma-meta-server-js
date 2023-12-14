import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import AppLayout from "./app-layout";
import InitLayout from "./init-layout";
import { C_API, C_Event } from "@dogma-project/constants-meta";
import { WebsocketContext } from "../context/ws-context";

function ServicesManager() {
  const {
    state: { services },
    dispatch,
  } = useContext(AppContext);
  const { isReady, value, send } = useContext(WebsocketContext);

  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (isReady) {
      send({
        type: C_API.ApiRequestType.services,
        action: C_API.ApiRequestAction.get,
      });
      dispatch({
        type: C_API.ApiRequestAction.set,
        value: {
          busy: false,
        },
      });
    } else {
      dispatch({
        type: C_API.ApiRequestAction.set,
        value: {
          busy: true,
        },
      });
    }
  }, [isReady]);

  useEffect(() => {
    console.log("PRE NOTIFY", value);
    if (value && value.type === C_API.ApiRequestType.services) {
      dispatch({
        type: C_API.ApiRequestAction.set, // edit
        value: value.payload,
      });
    }
  }, [value]);

  useEffect(() => {
    const user = services.find(
      (item) => item.service === C_Event.Type.storageUser
    );
    console.log("USER", user);
    if (!user || user.state <= 2) {
      return setStage(1);
    }
    const node = services.find(
      (item) => item.service === C_Event.Type.storageNode
    );
    if (!node || node.state <= 2) {
      return setStage(2);
    }
    const config = services.find(
      (item) => item.service === C_Event.Type.configDb
    );
    if (!config || config.state <= 2) {
      return setStage(3);
    }
    setStage(4);
  }, [services]);

  return stage === 0 ? (
    <div>Loading...</div>
  ) : stage === 4 ? (
    <AppLayout></AppLayout>
  ) : (
    <InitLayout stage={stage}></InitLayout>
  );
}

export default ServicesManager;
