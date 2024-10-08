import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


// utils/adminList.js
export const admins = ['ojodavid115@gmail.com', 'admin2@example.com'];
