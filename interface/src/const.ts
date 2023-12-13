export const API_PATH = import.meta.env.DEV
  ? `http://localhost:${import.meta.env.VITE_PORT}`
  : "";
// export const API_PATH = API_BASE + "/api";
// export const SSE_PATH = API_BASE + "/events";

declare global {
  interface Window {
    api: WebSocket;
  }
}
