import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const revalidateIntervalDay = (REVALIDATE_DAYS) => {
  const REVALIDATE_INTERVAL = REVALIDATE_DAYS * 24 * 60 * 60;
  return REVALIDATE_INTERVAL;
}

export const replaceOgUrl = (head, url = '')=> {
  return  head.replace(
      `<meta property="og:url" content="https://ofcpa.xyz${url}" />`,
      `<meta property="og:url" content="https://ofcpa.pro${url}" />`
  );
}
