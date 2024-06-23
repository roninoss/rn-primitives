import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fixManualImports(rawfile: string) {
  return rawfile.replaceAll('@rn-primitives/', '~/components/primitives/');
}
