export const API_BASE = import.meta.env.DEV
  ? `http://localhost:${import.meta.env.VITE_SERVER_PORT}`
  : "";
export const API_PATH = "/io";

declare global {
  interface Window {
    api: WebSocket;
  }
}
