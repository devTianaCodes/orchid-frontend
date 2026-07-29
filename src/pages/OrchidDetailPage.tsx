import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getOrchidBySlug, type OrchidDetail } from "../api/orchidApi";
import { ErrorState } from "../components/ErrorState";
import { FavoriteFeedback } from "../components/FavoriteFeedback";
import { LoadingState } from "../components/LoadingState";
import { useFavoriteOrchids } from "../hooks/useFavoriteOrchids";
import { recordRecentlyViewedOrchid } from "../utils/recentlyViewedOrchids";
import { toApiOrchidSlug } from "../utils/orchidRoutes";

export function OrchidDetailPage() {
  const { slug } = useParams();
  const [orchid, setOrchid] = useState<OrchidDetail | null>(null);
  const { closeFavoriteModal, favoriteModal, favoriteSlugs, toggleFavorite } = useFavoriteOrchids();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<"celsius" | "fahrenheit">("celsius");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const slugError = slug ? null : "Missing orchid slug.";

  useEffect(() => {
    if (!slug) {
      return;
    }

    let isMounted = true;
    const orchidSlug = toApiOrchidSlug(slug);

    async function loadOrchidDetail() {
      try {
        const response = await getOrchidBySlug(orchidSlug);

        if (isMounted) {
          setOrchid(response.orchid);
          recordRecentlyViewedOrchid(response.orchid);
          setErrorMessage(null);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "Unable to load orchid.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadOrchidDetail();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (slugError) {
    return <ErrorState title="Could not load orchid" message={slugError} />;
  }

  if (isLoading) {
    return <LoadingState label="Loading orchid care profile" />;
  }

  if (errorMessage || !orchid) {
    return (
      <ErrorState
        title="Could not load orchid"
        message={errorMessage ?? "This orchid care profile is not available."}
      />
    );
  }

  const isFavorite = favoriteSlugs.has(orchid.slug);

  async function copyOrchidLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  return (
    <article className="relative overflow-hidden rounded-lg bg-mist shadow-sm">
      <FavoriteFeedback feedback={favoriteModal} onClose={closeFavoriteModal} />
      <button
        type="button"
        aria-label={
          isFavorite
            ? `Remove ${orchid.commonName} from favorites`
            : `Add ${orchid.commonName} to favorites`
        }
        aria-pressed={isFavorite}
        onClick={(event) => toggleFavorite(orchid, event)}
        className={`absolute right-5 top-5 z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center text-2xl leading-none drop-shadow-[0_1px_2px_rgba(23,36,25,0.65)] transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
          isFavorite ? "text-rosy" : "text-white"
        }`}
      >
        <span aria-hidden="true">♥</span>
      </button>

      <div className="grid gap-8 p-5 sm:p-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:p-8">
        <div className="flex flex-col gap-5">
          <header className="pr-12">
            <p className="text-sm font-medium uppercase tracking-wide text-bark">{orchid.genus}</p>
            <h2 className="mt-9 text-3xl font-bold leading-tight sm:text-4xl lg:mt-10">
              {orchid.commonName}
            </h2>
            <p className="mt-2 text-lg italic text-bark">{orchid.scientificName}</p>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => void copyOrchidLink()}
                className="inline-flex h-10 items-center justify-center rounded-md border border-moss/45 bg-white/70 px-4 text-sm font-semibold text-rosy transition hover:border-rosy focus:outline-none focus-visible:ring-2 focus-visible:ring-rosy"
              >
                {copyStatus === "copied" ? "Link copied" : "Copy link"}
              </button>
              <p aria-live="polite" className="text-sm text-bark">
                {copyStatus === "error" ? "Could not copy the link." : ""}
              </p>
            </div>
          </header>

          <div className="aspect-[4/3] overflow-hidden rounded-md bg-peony/40 lg:max-h-[28rem]">
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

          <p className="max-w-2xl text-base leading-7 text-ink/80">{orchid.shortDescription}</p>

          <aside
            aria-label="Quick care summary"
            className="rounded-md border border-moss/25 bg-peony/45 px-4 py-3"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-bark">At a glance</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-ink">
              {formatDifficultySummary(orchid.difficulty)} · {formatLabel(orchid.wateringNeeds)}{" "}
              water · {formatLabel(orchid.lightNeeds)} light
            </p>
          </aside>

          <section className="grid grid-cols-2 gap-3 text-sm">
            <div className="col-span-2 flex items-center justify-between gap-3">
              <h3 className="font-medium text-bark">Growing conditions</h3>
              <div
                role="group"
                aria-label="Temperature unit"
                className="inline-flex rounded-md bg-white/70 p-1 shadow-sm"
              >
                <TemperatureUnitButton
                  label="°C"
                  isActive={temperatureUnit === "celsius"}
                  onClick={() => setTemperatureUnit("celsius")}
                />
                <TemperatureUnitButton
                  label="°F"
                  isActive={temperatureUnit === "fahrenheit"}
                  onClick={() => setTemperatureUnit("fahrenheit")}
                />
              </div>
            </div>
            <DetailMetric label="Difficulty" value={formatLabel(orchid.difficulty)} />
            <DetailMetric label="Light" value={formatLabel(orchid.lightNeeds)} />
            <DetailMetric label="Watering" value={formatLabel(orchid.wateringNeeds)} />
            <DetailMetric label="Growth" value={formatLabel(orchid.growthType)} />
            <DetailMetric
              label="Humidity"
              value={`${orchid.humidityMinPercent}% - ${orchid.humidityMaxPercent}%`}
            />
            <DetailMetric
              label="Temperature"
              value={formatTemperatureRange(
                orchid.temperatureMinCelsius,
                orchid.temperatureMaxCelsius,
                temperatureUnit,
              )}
            />
          </section>
        </div>

        <div className="flex flex-col justify-start pt-14 lg:pt-16">
          <section className="grid h-full gap-6 rounded-md bg-white/70 p-5 shadow-sm sm:p-6">
            <CareSection eyebrow="Origin" body={orchid.nativeRegion} />
            <CareSection eyebrow="Roots" body={orchid.pottingMedium} />
            <CareSection eyebrow="Bloom" body={orchid.bloomNotes} />
            <CareSection eyebrow="Care" body={orchid.careSummary} />
          </section>
        </div>
      </div>

      <div className="p-5 sm:p-6 lg:p-8">
        <div className="flex justify-center pb-4 pt-8">
          <Link
            to="/orchids"
            className="inline-flex h-10 items-center justify-center rounded-md border border-moss/45 px-4 text-sm font-semibold text-rosy transition hover:border-rosy focus:outline-none focus-visible:ring-2 focus-visible:ring-rosy"
          >
            Back to orchids
          </Link>
        </div>
      </div>
    </article>
  );
}

type TemperatureUnitButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

function TemperatureUnitButton({ label, isActive, onClick }: TemperatureUnitButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={`rounded px-3 py-1.5 text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-rosy ${
        isActive ? "bg-rosy text-white" : "text-bark hover:bg-peony/55"
      }`}
    >
      {label}
    </button>
  );
}

type DetailMetricProps = {
  label: string;
  value: string;
};

function DetailMetric({ label, value }: DetailMetricProps) {
  return (
    <div className="rounded-md bg-white/70 p-3">
      <p className="font-medium text-bark">{label}</p>
      <p className="mt-1 font-semibold text-ink">{value}</p>
    </div>
  );
}

type CareSectionProps = {
  eyebrow: string;
  body: string;
};

function CareSection({ eyebrow, body }: CareSectionProps) {
  return (
    <section>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-bark">{eyebrow}</h3>
      <p className="mt-3 text-sm leading-6 text-ink/80">{body}</p>
    </section>
  );
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDifficultySummary(difficulty: OrchidDetail["difficulty"]) {
  if (difficulty === "beginner") {
    return "Beginner friendly";
  }

  if (difficulty === "intermediate") {
    return "Intermediate care";
  }

  return "Advanced care";
}

function formatTemperatureRange(
  minimumCelsius: number,
  maximumCelsius: number,
  unit: "celsius" | "fahrenheit",
) {
  if (unit === "fahrenheit") {
    const minimumFahrenheit = Math.round((minimumCelsius * 9) / 5 + 32);
    const maximumFahrenheit = Math.round((maximumCelsius * 9) / 5 + 32);

    return `${minimumFahrenheit}°F - ${maximumFahrenheit}°F`;
  }

  return `${minimumCelsius}°C - ${maximumCelsius}°C`;
}
