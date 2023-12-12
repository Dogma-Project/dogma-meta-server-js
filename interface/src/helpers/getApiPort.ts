function getCookie(name: string) {
  const parted = document.cookie.split(";").map((i) => i.trim());
  const needle = parted.find((i) => i.indexOf(`${name}=`) > -1);
  console.log("COOKIE", name, needle);
  if (!needle) return undefined;
  return needle.split("=")[1];
}

/**
 * @todo add electron and another methods to determine server port
 * @returns
 */
export default function getApiPort(): number | null {
  if (import.meta.env.VITE_PORT) return Number(import.meta.env.VITE_PORT);
  const cookieValue = getCookie("dogma-api-port");
  if (cookieValue) return Number(cookieValue);
  return null;
}
