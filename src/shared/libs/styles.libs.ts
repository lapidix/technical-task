import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function tcm(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
