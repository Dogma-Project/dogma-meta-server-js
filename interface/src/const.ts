export const API_BASE = import.meta.env.DEV ? "http://localhost:4444" : ""; // edit

export const API_PATH = API_BASE + "/api";
export const SSE_PATH = API_BASE + "/events";
