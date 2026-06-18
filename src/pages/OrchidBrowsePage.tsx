import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import {
  readFavoriteOrchids,
  saveFavoriteOrchids,
  toggleFavoriteOrchid,
} from "../utils/favoriteOrchids";
import { toOrchidDetailPath } from "../utils/orchidRoutes";

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
const favoriteIconClass =
  "absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center text-2xl leading-none drop-shadow-[0_1px_2px_rgba(23,36,25,0.65)] transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white";

export function OrchidBrowsePage() {
  const [orchids, setOrchids] = useState<OrchidListItem[]>([]);
  const [pagination, setPagination] = useState<OrchidListPagination | null>(null);
  const [filterMetadata, setFilterMetadata] = useState<
    OrchidFilterMetadataResponse["filters"] | null
  >(null);
  const [filters, setFilters] = useState<BrowseFilters>(defaultBrowseFilters);
  const [favoriteOrchids, setFavoriteOrchids] = useState<OrchidListItem[]>(readFavoriteOrchids);
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
  const favoriteSlugs = new Set(favoriteOrchids.map((orchid) => orchid.slug));

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

  function toggleFavorite(orchid: OrchidListItem) {
    setFavoriteOrchids((currentFavorites) => {
      const nextFavorites = toggleFavoriteOrchid(orchid, currentFavorites);

      saveFavoriteOrchids(nextFavorites);
      return nextFavorites;
    });
  }

  return (
    <>
      {filterMetadata ? (
        <section className="rounded-lg bg-mist p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1.5fr)_repeat(2,minmax(0,1fr))]">
            <label className="flex flex-col gap-2 text-sm font-medium text-bark">
              Search
              <input
                type="search"
                value={filters.q}
                onChange={(event) => updateFilter("q", event.target.value)}
                placeholder="Name, genus, care keyword"
                className="h-11 rounded-md border border-moss/45 bg-white px-3 text-base font-normal text-ink outline-none transition focus:border-rosy"
              />
            </label>

            <SelectFilter
              label="Difficulty"
              value={filters.difficulty}
              options={filterMetadata.difficulties}
              onChange={(value) => updateFilter("difficulty", value as BrowseFilters["difficulty"])}
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
              onChange={(value) => updateFilter("growthType", value as BrowseFilters["growthType"])}
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

          <div className="mt-4 flex justify-end pt-4">
            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="h-10 rounded-md border border-moss/45 px-4 text-sm font-semibold text-rosy transition hover:border-rosy disabled:cursor-not-allowed disabled:opacity-45"
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
                  className="relative overflow-hidden rounded-lg bg-mist shadow-sm"
                >
                  <button
                    type="button"
                    aria-label={
                      favoriteSlugs.has(orchid.slug)
                        ? `Remove ${orchid.commonName} from favorites`
                        : `Add ${orchid.commonName} to favorites`
                    }
                    aria-pressed={favoriteSlugs.has(orchid.slug)}
                    onClick={() => toggleFavorite(orchid)}
                    className={`${favoriteIconClass} ${
                      favoriteSlugs.has(orchid.slug) ? "text-rosy" : "text-white"
                    }`}
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
                    <div className="flex min-h-64 flex-col gap-3 p-4">
                      <div>
                        <h2 className="text-xl font-semibold leading-7">{orchid.commonName}</h2>
                        <p className="text-sm italic leading-6 text-bark">
                          {orchid.scientificName}
                        </p>
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
              ))}
            </ul>

            {pagination && pagination.totalPages > 1 ? (
              <PaginationControls pagination={pagination} onPageChange={changePage} />
            ) : null}
          </div>
        ) : null}
      </div>
    </>
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
        className="h-11 rounded-md border border-moss/45 bg-white px-3 text-base font-normal text-ink outline-none transition focus:border-rosy"
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
        className="h-11 min-w-24 rounded-md border border-moss/45 bg-mist px-4 font-semibold text-rosy transition hover:border-rosy disabled:cursor-not-allowed disabled:opacity-45"
      >
        Previous
      </button>

      <span className="min-w-28 text-center font-medium text-white" aria-live="polite">
        Page {pagination.page} of {pagination.totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(pagination.page + 1)}
        disabled={!pagination.hasNextPage}
        className="h-11 min-w-24 rounded-md border border-moss/45 bg-mist px-4 font-semibold text-rosy transition hover:border-rosy disabled:cursor-not-allowed disabled:opacity-45"
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
