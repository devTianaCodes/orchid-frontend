import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";

import type { OrchidListItem } from "../api/orchidApi";
import { EmptyState } from "../components/EmptyState";
import { FavoriteFeedback } from "../components/FavoriteFeedback";
import { OrchidCard } from "../components/OrchidCard";
import {
  readFavoriteOrchids,
  saveFavoriteOrchids,
  toggleFavoriteOrchid,
} from "../utils/favoriteOrchids";
import { createFavoriteModal, type FavoriteModalState } from "../utils/favoriteModal";

export function FavoritesPage() {
  const [favoriteOrchids, setFavoriteOrchids] = useState<OrchidListItem[]>(readFavoriteOrchids);
  const [favoriteModal, setFavoriteModal] = useState<FavoriteModalState | null>(null);

  function toggleFavorite(orchid: OrchidListItem, event: MouseEvent<HTMLButtonElement>) {
    setFavoriteOrchids((currentFavorites) => {
      const nextFavorites = toggleFavoriteOrchid(orchid, currentFavorites);

      saveFavoriteOrchids(nextFavorites);
      setFavoriteModal(createFavoriteModal("Removed from favourite", event));
      return nextFavorites;
    });
  }

  if (favoriteOrchids.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <EmptyState
          title="No favorite orchids yet"
          message="Tap the heart on an orchid card to save it here."
        />
        <div className="flex justify-center">
          <Link
            to="/orchids"
            className="inline-flex h-11 items-center justify-center rounded-md border border-moss/45 bg-mist px-5 text-sm font-semibold text-rosy transition hover:border-rosy focus:outline-none focus-visible:ring-2 focus-visible:ring-rosy"
          >
            Browse orchids
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-5">
      <FavoriteFeedback feedback={favoriteModal} onClose={() => setFavoriteModal(null)} />

      <div className="rounded-lg bg-mist p-5 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-bark">Favorites</p>
        <h1 className="mt-2 text-3xl font-bold">Saved orchids</h1>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favoriteOrchids.map((orchid) => (
          <OrchidCard
            key={orchid.slug}
            orchid={orchid}
            isFavorite={true}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </ul>
    </section>
  );
}
