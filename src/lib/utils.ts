import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BRAND = "DΛΛKYΣ";

export function scrollToId(id: string, reduced = false) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
