import { useMemo, useState, type MouseEvent } from "react";

import type { OrchidListItem } from "../api/orchidApi";
import {
  readFavoriteOrchids,
  saveFavoriteOrchids,
  toggleFavoriteOrchid,
} from "../utils/favoriteOrchids";
import { createFavoriteModal, type FavoriteModalState } from "../utils/favoriteModal";

export function useFavoriteOrchids() {
  const [favoriteOrchids, setFavoriteOrchids] = useState<OrchidListItem[]>(readFavoriteOrchids);
  const [favoriteModal, setFavoriteModal] = useState<FavoriteModalState | null>(null);
  const favoriteSlugs = useMemo(
    () => new Set(favoriteOrchids.map((orchid) => orchid.slug)),
    [favoriteOrchids],
  );

  function toggleFavorite(orchid: OrchidListItem, event: MouseEvent<HTMLButtonElement>) {
    setFavoriteOrchids((currentFavorites) => {
      const isAlreadyFavorite = currentFavorites.some((favorite) => favorite.slug === orchid.slug);
      const nextFavorites = toggleFavoriteOrchid(orchid, currentFavorites);

      saveFavoriteOrchids(nextFavorites);
      setFavoriteModal(
        createFavoriteModal(
          isAlreadyFavorite ? "Removed from favourite" : "Added to favourite",
          event,
        ),
      );

      return nextFavorites;
    });
  }

  return {
    closeFavoriteModal: () => setFavoriteModal(null),
    favoriteModal,
    favoriteOrchids,
    favoriteSlugs,
    toggleFavorite,
  };
}
