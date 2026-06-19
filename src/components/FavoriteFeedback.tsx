import { useEffect } from "react";

import type { FavoriteModalState } from "../utils/favoriteModal";

type FavoriteFeedbackProps = {
  feedback: FavoriteModalState | null;
  onClose: () => void;
};

export function FavoriteFeedback({ feedback, onClose }: FavoriteFeedbackProps) {
  useEffect(() => {
    if (!feedback) {
      return;
    }

    const closeTimeout = window.setTimeout(onClose, 1600);

    return () => {
      window.clearTimeout(closeTimeout);
    };
  }, [feedback, onClose]);

  if (!feedback) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed z-50 rounded-md bg-mist px-5 py-3 text-center text-sm font-semibold text-rosy shadow-lg"
      style={{ left: feedback.x, top: feedback.y }}
    >
      {feedback.message}
    </div>
  );
}
