import type { MouseEvent } from "react";
import { Link } from "react-router-dom";

import type { OrchidListItem } from "../api/orchidApi";
import { toOrchidDetailPath } from "../utils/orchidRoutes";

type OrchidCardProps = {
  orchid: OrchidListItem;
  isFavorite: boolean;
  onToggleFavorite: (orchid: OrchidListItem, event: MouseEvent<HTMLButtonElement>) => void;
};

const favoriteIconClass =
  "absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center text-2xl leading-none drop-shadow-[0_1px_2px_rgba(23,36,25,0.65)] transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white";

export function OrchidCard({ orchid, isFavorite, onToggleFavorite }: OrchidCardProps) {
  return (
    <li className="relative overflow-hidden rounded-lg bg-mist shadow-sm">
      <button
        type="button"
        aria-label={
          isFavorite
            ? `Remove ${orchid.commonName} from favorites`
            : `Add ${orchid.commonName} to favorites`
        }
        aria-pressed={isFavorite}
        onClick={(event) => onToggleFavorite(orchid, event)}
        className={`${favoriteIconClass} ${isFavorite ? "text-rosy" : "text-white"}`}
      >
        <span aria-hidden="true">♥</span>
      </button>
      <Link
        to={toOrchidDetailPath(orchid.slug)}
        className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-rosy"
      >
        <div className="aspect-[4/3] w-full overflow-hidden bg-peony/40">
          {orchid.imageUrl ? (
            <img
              src={orchid.imageUrl}
              alt={orchid.imageAlt ?? orchid.commonName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full" role="img" aria-label={orchid.commonName} />
          )}
        </div>
        <div className="flex min-h-64 flex-col gap-3 p-4">
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
