import { useContext, useEffect } from "react";
import { AppContext, WebsocketContext } from "../../context";
import { C_API } from "@dogma-project/constants-meta";

function Network() {
  const {
    state: { network },
    dispatch,
  } = useContext(AppContext);
  const { isReady, value, send } = useContext(WebsocketContext);

  useEffect(() => {
    if (isReady) {
      send({
        type: C_API.ApiRequestType.network,
        action: C_API.ApiRequestAction.get,
      });
    }
  }, [isReady]);

  useEffect(() => {
    if (value && value.type === C_API.ApiRequestType.network) {
      dispatch({
        type: value.action,
        value: value.payload,
      });
    }
  }, [value]);

  return <>{JSON.stringify(network)}</>;
}

export default Network;
