import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import AppLayout from "./app-layout";
import InitLayout from "./init-layout";
import { C_Event } from "@dogma-project/constants-meta";
// import { SSE_PATH } from "../const";

function ServicesManager() {
  const {
    state: { services },
    dispatch,
    managerRequest,
  } = useContext(AppContext);

  useEffect(() => {
    // const evtSource = new EventSource(SSE_PATH);
    // evtSource.onmessage = (e) => {
    //   const parsed = JSON.parse(e.data);
    //   switch (parsed.type) {
    //     case "services":
    //       console.log(parsed);
    //       dispatch({ type: "set", value: { services: parsed.payload } });
    //       break;
    //   }
    // };
  }, []);

  const [stage, setStage] = useState(0);

  useEffect(() => {
    managerRequest("GET", "/services", {
      cb: (data) => {
        dispatch({
          type: "set",
          value: {
            services: data,
          },
        });
      },
    });
  }, []);

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
