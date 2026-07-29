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
    <li className="relative overflow-hidden rounded-lg bg-mist shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
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
        <div className="aspect-[5/4] w-full overflow-hidden bg-peony/40">
          {orchid.imageUrl ? (
            <img
              src={orchid.imageUrl}
              alt={orchid.imageAlt ?? orchid.commonName}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full" role="img" aria-label={orchid.commonName} />
          )}
        </div>
        <div className="flex min-h-60 flex-col gap-4 p-4">
          <div>
            <h2 className="text-lg font-semibold leading-6 text-ink">{orchid.commonName}</h2>
            <p className="mt-1 text-sm italic leading-5 text-bark">{orchid.scientificName}</p>
          </div>
          <p className="line-clamp-3 text-sm leading-6 text-ink/75">{orchid.shortDescription}</p>
          <ul aria-label="Quick care needs" className="flex flex-wrap gap-2">
            <CareBadge label={formatCareLabel(orchid.difficulty)} />
            <CareBadge label={`${formatCareLabel(orchid.lightNeeds)} light`} />
            <CareBadge label={`${formatCareLabel(orchid.wateringNeeds)} water`} />
          </ul>
          <div className="mt-auto flex justify-center pt-1">
            <span className="inline-flex h-10 items-center justify-center rounded-md border border-moss/45 px-5 text-sm font-semibold text-rosy transition group-hover:border-rosy">
              Explore
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

function CareBadge({ label }: { label: string }) {
  return (
    <li className="rounded-full bg-peony/55 px-2.5 py-1 text-xs font-semibold text-bark">
      {label}
    </li>
  );
}

function formatCareLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
