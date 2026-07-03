import { Link } from "react-router-dom";

import { EmptyState } from "../components/EmptyState";
import { FavoriteFeedback } from "../components/FavoriteFeedback";
import { OrchidCard } from "../components/OrchidCard";
import { useFavoriteOrchids } from "../hooks/useFavoriteOrchids";

export function FavoritesPage() {
  const { closeFavoriteModal, favoriteModal, favoriteOrchids, toggleFavorite } =
    useFavoriteOrchids();

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
      <FavoriteFeedback feedback={favoriteModal} onClose={closeFavoriteModal} />

      <div className="rounded-lg bg-mist p-5 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-bark">Favorites</p>
        <p className="mt-3 text-base leading-7 text-ink/80">
          Keep your saved orchid profiles in one place for quick care reference.
        </p>
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
