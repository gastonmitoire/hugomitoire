import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanFragmentHtml(html: string): string {
  return html
    .replace(/font-family:\s*'[^']*'[^;'"]*;?/g, "")
    .replace(/font-family:\s*"[^"]*"[^;'"]*;?/g, "")
    .replace(/\bcolor:\s*#?[0-9a-fA-F]{3,8}\s*;?/g, "")
    .replace(/background-color:\s*[^;'"]+;?/g, "")
    .replace(/white-space:\s*[^;'"]+;?/g, "");
}
