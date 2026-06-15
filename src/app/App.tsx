import { useEffect, useState } from "react";

import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { listOrchids, type OrchidListItem } from "../api/orchidApi";

export function App() {
  const [orchids, setOrchids] = useState<OrchidListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadOrchids() {
      try {
        const response = await listOrchids();

        if (isMounted) {
          setOrchids(response.orchids);
          setErrorMessage(null);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "Unable to load orchids.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadOrchids();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-mist text-ink">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <header>
          <h1 className="text-4xl font-bold sm:text-5xl">OrchidCare</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-bark">
            Browse orchid care profiles and start learning what each variety needs to thrive.
          </p>
        </header>

        {isLoading ? <LoadingState label="Loading orchids" /> : null}

        {!isLoading && errorMessage ? (
          <ErrorState
            title="Could not load orchids"
            message="Start the backend server and refresh the page."
          />
        ) : null}

        {!isLoading && !errorMessage && orchids.length === 0 ? (
          <EmptyState
            title="No orchids yet"
            message="Add seed data to see orchid care profiles here."
          />
        ) : null}

        {!isLoading && !errorMessage && orchids.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orchids.map((orchid) => (
              <li
                key={orchid.slug}
                className="overflow-hidden rounded-lg border border-moss/25 bg-white shadow-sm"
              >
                {orchid.imageUrl ? (
                  <img
                    src={orchid.imageUrl}
                    alt={orchid.imageAlt ?? orchid.commonName}
                    className="aspect-[4/3] w-full bg-petal/40 object-cover"
                  />
                ) : (
                  <div className="aspect-[4/3] w-full bg-petal/40" aria-label={orchid.commonName} />
                )}
                <div className="space-y-3 p-4">
                  <div>
                    <h2 className="text-xl font-semibold leading-7">{orchid.commonName}</h2>
                    <p className="text-sm italic leading-6 text-bark">{orchid.scientificName}</p>
                  </div>
                  <p className="text-sm leading-6 text-ink/80">{orchid.shortDescription}</p>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="font-medium text-bark">Difficulty</dt>
                      <dd className="capitalize text-ink">{orchid.difficulty}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-bark">Light</dt>
                      <dd className="capitalize text-ink">{orchid.lightNeeds.replace("-", " ")}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </main>
  );
}
