import type { MouseEvent } from "react";

export type FavoriteModalState = {
  message: string;
  x: number;
  y: number;
};

export function createFavoriteModal(message: string, event: MouseEvent<HTMLButtonElement>) {
  const modalX = Math.min(event.clientX + 16, window.innerWidth - 220);
  const modalY = Math.min(event.clientY + 16, window.innerHeight - 96);

  return {
    message,
    x: Math.max(16, modalX),
    y: Math.max(16, modalY),
  };
}
