import { useEffect, useRef, useState } from "react";

import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import {
  getOrchidFilters,
  listOrchids,
  type OrchidBloomSeason,
  type OrchidDifficulty,
  type OrchidFilterMetadataResponse,
  type OrchidGrowthType,
  type OrchidLightNeeds,
  type OrchidListFilters,
  type OrchidListItem,
  type OrchidListPagination,
  type OrchidWateringNeeds,
} from "../api/orchidApi";

type BrowseFilters = {
  q: string;
  difficulty: "" | OrchidDifficulty;
  light: "" | OrchidLightNeeds;
  water: "" | OrchidWateringNeeds;
  growthType: "" | OrchidGrowthType;
  bloomSeason: "" | OrchidBloomSeason;
};

const defaultBrowseFilters: BrowseFilters = {
  q: "",
  difficulty: "",
  light: "",
  water: "",
  growthType: "",
  bloomSeason: "",
};

const orchidPageSize = 12;

export function App() {
  const [orchids, setOrchids] = useState<OrchidListItem[]>([]);
  const [pagination, setPagination] = useState<OrchidListPagination | null>(null);
  const [filterMetadata, setFilterMetadata] = useState<
    OrchidFilterMetadataResponse["filters"] | null
  >(null);
  const [filters, setFilters] = useState<BrowseFilters>(defaultBrowseFilters);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const filterRequestIdRef = useRef(0);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      try {
        const [orchidResponse, filterResponse] = await Promise.all([
          listOrchids({ page: 1, pageSize: orchidPageSize }),
          getOrchidFilters(),
        ]);

        if (isMounted) {
          setOrchids(orchidResponse.orchids);
          setPagination(orchidResponse.pagination);
          setFilterMetadata(filterResponse.filters);
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

    void loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    let isMounted = true;
    const requestId = filterRequestIdRef.current + 1;

    filterRequestIdRef.current = requestId;

    const loadTimeout = window.setTimeout(() => {
      void loadFilteredOrchids();
    }, 250);

    async function loadFilteredOrchids() {
      try {
        const response = await listOrchids({
          ...toOrchidListFilters(filters),
          page,
          pageSize: orchidPageSize,
        });

        if (isMounted && filterRequestIdRef.current === requestId) {
          setOrchids(response.orchids);
          setPagination(response.pagination);
          setErrorMessage(null);
        }
      } catch (error) {
        if (isMounted && filterRequestIdRef.current === requestId) {
          setErrorMessage(error instanceof Error ? error.message : "Unable to load orchids.");
        }
      }
    }

    return () => {
      isMounted = false;
      window.clearTimeout(loadTimeout);
    };
  }, [filters, isLoading, page]);

  const hasActiveFilters = Object.values(filters).some(Boolean);

  function updateFilter<TName extends keyof BrowseFilters>(
    name: TName,
    value: BrowseFilters[TName],
  ) {
    setPage(1);
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  }

  function clearFilters() {
    setPage(1);
    setFilters(defaultBrowseFilters);
  }

  function changePage(nextPage: number) {
    setPage(nextPage);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen bg-mist text-ink">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <header>
          <h1 className="text-4xl font-bold sm:text-5xl">OrchidCare</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-bark">
            Browse orchid care profiles and start learning what each variety needs to thrive.
          </p>
        </header>

        {filterMetadata ? (
          <section className="rounded-lg border border-moss/25 bg-white p-4 shadow-sm">
            <div className="grid gap-4 md:grid-cols-[minmax(0,1.5fr)_repeat(2,minmax(0,1fr))]">
              <label className="flex flex-col gap-2 text-sm font-medium text-bark">
                Search
                <input
                  type="search"
                  value={filters.q}
                  onChange={(event) => updateFilter("q", event.target.value)}
                  placeholder="Name, genus, care keyword"
                  className="h-11 rounded-md border border-moss/35 bg-mist px-3 text-base font-normal text-ink outline-none transition focus:border-leaf focus:bg-white"
                />
              </label>

              <SelectFilter
                label="Difficulty"
                value={filters.difficulty}
                options={filterMetadata.difficulties}
                onChange={(value) =>
                  updateFilter("difficulty", value as BrowseFilters["difficulty"])
                }
              />

              <SelectFilter
                label="Light"
                value={filters.light}
                options={filterMetadata.lightNeeds}
                onChange={(value) => updateFilter("light", value as BrowseFilters["light"])}
              />

              <SelectFilter
                label="Water"
                value={filters.water}
                options={filterMetadata.wateringNeeds}
                onChange={(value) => updateFilter("water", value as BrowseFilters["water"])}
              />

              <SelectFilter
                label="Growth"
                value={filters.growthType}
                options={filterMetadata.growthTypes}
                onChange={(value) =>
                  updateFilter("growthType", value as BrowseFilters["growthType"])
                }
              />

              <SelectFilter
                label="Bloom"
                value={filters.bloomSeason}
                options={filterMetadata.bloomSeasons}
                onChange={(value) =>
                  updateFilter("bloomSeason", value as BrowseFilters["bloomSeason"])
                }
              />
            </div>

            <div className="mt-4 flex justify-end border-t border-moss/20 pt-4">
              <button
                type="button"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="h-10 rounded-md border border-moss/35 px-4 text-sm font-semibold text-leaf transition hover:border-leaf disabled:cursor-not-allowed disabled:opacity-45"
              >
                Clear
              </button>
            </div>
          </section>
        ) : null}

        {isLoading ? <LoadingState label="Loading orchids" /> : null}

        {!isLoading && errorMessage ? (
          <ErrorState
            title="Could not load orchids"
            message="Start the backend server and refresh the page."
          />
        ) : null}

        <div ref={resultsRef}>
          {!isLoading && !errorMessage && orchids.length === 0 ? (
            <EmptyState
              title="No matching orchids"
              message="Adjust the search or filters to find more orchid care profiles."
            />
          ) : null}

          {!isLoading && !errorMessage && orchids.length > 0 ? (
            <div className="flex flex-col gap-6">
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {orchids.map((orchid) => (
                  <li
                    key={orchid.slug}
                    className="overflow-hidden rounded-lg border border-moss/25 bg-white shadow-sm"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-petal/40">
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
                    <div className="space-y-3 p-4">
                      <div>
                        <h2 className="text-xl font-semibold leading-7">{orchid.commonName}</h2>
                        <p className="text-sm italic leading-6 text-bark">
                          {orchid.scientificName}
                        </p>
                      </div>
                      <p className="text-sm leading-6 text-ink/80">{orchid.shortDescription}</p>
                      <dl className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <dt className="font-medium text-bark">Difficulty</dt>
                          <dd className="capitalize text-ink">{orchid.difficulty}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-bark">Light</dt>
                          <dd className="capitalize text-ink">
                            {orchid.lightNeeds.replace("-", " ")}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                ))}
              </ul>

              {pagination && pagination.totalPages > 1 ? (
                <PaginationControls pagination={pagination} onPageChange={changePage} />
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

type SelectFilterProps = {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
};

function SelectFilter({ label, value, options, onChange }: SelectFilterProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-bark">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-md border border-moss/35 bg-mist px-3 text-base font-normal text-ink outline-none transition focus:border-leaf focus:bg-white"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

type PaginationControlsProps = {
  pagination: OrchidListPagination;
  onPageChange: (page: number) => void;
};

function PaginationControls({ pagination, onPageChange }: PaginationControlsProps) {
  return (
    <nav
      aria-label="Orchid pages"
      className="flex flex-wrap items-center justify-center gap-3 text-sm"
    >
      <button
        type="button"
        onClick={() => onPageChange(pagination.page - 1)}
        disabled={!pagination.hasPreviousPage}
        className="h-11 min-w-24 rounded-md border border-moss/35 px-4 font-semibold text-leaf transition hover:border-leaf disabled:cursor-not-allowed disabled:opacity-45"
      >
        Previous
      </button>

      <span className="min-w-28 text-center font-medium text-bark" aria-live="polite">
        Page {pagination.page} of {pagination.totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(pagination.page + 1)}
        disabled={!pagination.hasNextPage}
        className="h-11 min-w-24 rounded-md border border-moss/35 px-4 font-semibold text-leaf transition hover:border-leaf disabled:cursor-not-allowed disabled:opacity-45"
      >
        Next
      </button>
    </nav>
  );
}

function toOrchidListFilters(filters: BrowseFilters): OrchidListFilters {
  return {
    q: filters.q.trim() || undefined,
    difficulty: filters.difficulty || undefined,
    light: filters.light || undefined,
    water: filters.water || undefined,
    growthType: filters.growthType || undefined,
    bloomSeason: filters.bloomSeason || undefined,
  };
}
