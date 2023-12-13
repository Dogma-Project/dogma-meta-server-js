import { createContext, useEffect, useRef, useState } from "react";
import { API } from "@dogma-project/core-meta/types/types";

type ContextType = {
  isReady: boolean;
  value: API.ApiRequest | null;
  send: (params: object) => void;
};

export const WebsocketContext = createContext<ContextType>({
  isReady: false,
  value: null,
  send: () => {},
});

export const WebsocketProvider = (props: {
  children: React.ReactNode;
  api: number;
}) => {
  const [isReady, setIsReady] = useState(false);
  const [value, setVal] = useState(null);
  const { api } = props;

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (api) {
      const addr = `ws://${window.location.hostname}:${api}`;
      const socket = new WebSocket(addr);

      socket.onopen = () => setIsReady(true);
      socket.onclose = () => setIsReady(false);
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("WS", data.payload);
        setVal(data);
      };
      ws.current = socket;
      return () => {
        socket.close();
      };
    }
  }, [api]);

  const ret = {
    isReady,
    value,
    send: (params: object) => {
      if (ws.current && isReady) {
        ws.current.send(JSON.stringify(params));
      } else {
        console.warn("WS API is not ready");
      }
    },
  };

  return (
    <WebsocketContext.Provider value={ret}>
      {props.children}
    </WebsocketContext.Provider>
  );
};
