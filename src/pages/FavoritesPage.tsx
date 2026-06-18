import { useEffect, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";

import type { OrchidListItem } from "../api/orchidApi";
import { EmptyState } from "../components/EmptyState";
import {
  readFavoriteOrchids,
  saveFavoriteOrchids,
  toggleFavoriteOrchid,
} from "../utils/favoriteOrchids";
import { createFavoriteModal, type FavoriteModalState } from "../utils/favoriteModal";
import { toOrchidDetailPath } from "../utils/orchidRoutes";

export function FavoritesPage() {
  const [favoriteOrchids, setFavoriteOrchids] = useState<OrchidListItem[]>(readFavoriteOrchids);
  const [favoriteModal, setFavoriteModal] = useState<FavoriteModalState | null>(null);

  useEffect(() => {
    if (!favoriteModal) {
      return;
    }

    const closeTimeout = window.setTimeout(() => {
      setFavoriteModal(null);
    }, 1600);

    return () => {
      window.clearTimeout(closeTimeout);
    };
  }, [favoriteModal]);

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
            className="inline-flex h-11 items-center justify-center rounded-md border border-moss/45 bg-mist px-5 text-sm font-semibold text-rosy transition hover:border-rosy"
          >
            Browse orchids
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-5">
      {favoriteModal ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed z-50 rounded-md bg-mist px-5 py-3 text-center text-sm font-semibold text-rosy shadow-lg"
          style={{ left: favoriteModal.x, top: favoriteModal.y }}
        >
          {favoriteModal.message}
        </div>
      ) : null}

      <div className="rounded-lg bg-mist p-5 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-bark">Favorites</p>
        <h1 className="mt-2 text-3xl font-bold">Saved orchids</h1>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favoriteOrchids.map((orchid) => (
          <FavoriteOrchidCard key={orchid.slug} orchid={orchid} onToggleFavorite={toggleFavorite} />
        ))}
      </ul>
    </section>
  );
}

type FavoriteOrchidCardProps = {
  orchid: OrchidListItem;
  onToggleFavorite: (orchid: OrchidListItem, event: MouseEvent<HTMLButtonElement>) => void;
};

function FavoriteOrchidCard({ orchid, onToggleFavorite }: FavoriteOrchidCardProps) {
  return (
    <li className="relative overflow-hidden rounded-lg bg-mist shadow-sm">
      <button
        type="button"
        aria-label={`Remove ${orchid.commonName} from favorites`}
        aria-pressed="true"
        onClick={(event) => onToggleFavorite(orchid, event)}
        className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center text-2xl leading-none text-rosy drop-shadow-[0_1px_2px_rgba(23,36,25,0.65)] transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        ♥
      </button>
      <Link to={toOrchidDetailPath(orchid.slug)} className="group block h-full">
        <div className="aspect-[4/3] w-full overflow-hidden bg-peony/40">
          {orchid.imageUrl ? (
            <img
              src={orchid.imageUrl}
              alt={orchid.imageAlt ?? orchid.commonName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full" aria-label={orchid.commonName} />
          )}
        </div>
        <div className="flex min-h-56 flex-col gap-3 p-4">
          <div>
            <h2 className="text-xl font-semibold leading-7">{orchid.commonName}</h2>
            <p className="text-sm italic leading-6 text-bark">{orchid.scientificName}</p>
          </div>
          <p className="text-sm leading-6 text-ink/80">{orchid.shortDescription}</p>
          <div className="mt-auto flex -translate-y-[15px] justify-center pt-2">
            <span className="inline-flex h-10 items-center justify-center rounded-md border border-moss/45 px-4 text-sm font-semibold text-rosy transition group-hover:border-rosy">
              Explore
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
