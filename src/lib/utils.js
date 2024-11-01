import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const revalidateIntervalDay = (REVALIDATE_DAYS) => {
  const REVALIDATE_INTERVAL = REVALIDATE_DAYS * 24 * 60 * 60;
  return REVALIDATE_INTERVAL;
}
