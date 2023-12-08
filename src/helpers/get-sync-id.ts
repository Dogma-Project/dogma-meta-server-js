import { randomBytes } from "node:crypto";

/**
 * @param size *2
 */
const generateSyncId = (size: number = 6): string => {
  size = Number(size) || 6;
  const time = new Date().getTime();
  return randomBytes(size).toString("hex") + time.toString().slice(-size);
};

export default generateSyncId;
