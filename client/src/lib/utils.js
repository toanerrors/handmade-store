import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function fDate(date) {
  return new Intl.DateTimeFormat("en-US").format(new Date(date));
}

export function fVND(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  }).format(price);
}