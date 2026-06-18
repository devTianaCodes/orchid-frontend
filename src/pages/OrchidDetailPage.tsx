import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getOrchidBySlug, type OrchidDetail } from "../api/orchidApi";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { toApiOrchidSlug } from "../utils/orchidRoutes";

export function OrchidDetailPage() {
  const { slug } = useParams();
  const [orchid, setOrchid] = useState<OrchidDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

  return (
    <article className="overflow-hidden rounded-lg bg-mist shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch">
        <div className="aspect-[4/3] bg-peony/40 lg:aspect-auto lg:max-h-[34rem]">
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

        <div className="flex flex-col gap-6 p-5 sm:p-6 lg:p-8">
          <Link to="/orchids" className="text-sm font-semibold text-rosy hover:underline">
            Back to orchids
          </Link>

          <header>
            <p className="text-sm font-medium uppercase tracking-wide text-bark">{orchid.genus}</p>
            <h2 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
              {orchid.commonName}
            </h2>
            <p className="mt-2 text-lg italic text-bark">{orchid.scientificName}</p>
            <p className="mt-4 text-base leading-7 text-ink/80">{orchid.shortDescription}</p>
          </header>

          <section className="grid gap-3 text-sm sm:grid-cols-2">
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
              value={`${orchid.temperatureMinCelsius}°C - ${orchid.temperatureMaxCelsius}°C`}
            />
          </section>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-3 lg:p-8">
        <CareSection title="Native Region" body={orchid.nativeRegion} />
        <CareSection title="Potting Medium" body={orchid.pottingMedium} />
        <CareSection title={`Bloom: ${formatLabel(orchid.bloomSeason)}`} body={orchid.bloomNotes} />
        <section className="lg:col-span-3">
          <h3 className="text-lg font-semibold">Care Summary</h3>
          <p className="mt-2 max-w-4xl text-base leading-7 text-ink/80">{orchid.careSummary}</p>
        </section>
      </div>
    </article>
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
  title: string;
  body: string;
};

function CareSection({ title, body }: CareSectionProps) {
  return (
    <section>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-base leading-7 text-ink/80">{body}</p>
    </section>
  );
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
