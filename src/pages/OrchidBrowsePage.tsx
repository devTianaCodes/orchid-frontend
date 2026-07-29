import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
import { FavoriteFeedback } from "../components/FavoriteFeedback";
import { LoadingState } from "../components/LoadingState";
import { OrchidCard } from "../components/OrchidCard";
import { PaginationControls } from "../components/PaginationControls";
import { useFavoriteOrchids } from "../hooks/useFavoriteOrchids";
import { readRecentlyViewedOrchids } from "../utils/recentlyViewedOrchids";
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

export function OrchidBrowsePage() {
  const navigate = useNavigate();
  const [recentlyViewedOrchids] = useState(readRecentlyViewedOrchids);
  const [orchids, setOrchids] = useState<OrchidListItem[]>([]);
  const [pagination, setPagination] = useState<OrchidListPagination | null>(null);
  const [filterMetadata, setFilterMetadata] = useState<
    OrchidFilterMetadataResponse["filters"] | null
  >(null);
  const [filters, setFilters] = useState<BrowseFilters>(defaultBrowseFilters);
  const { closeFavoriteModal, favoriteModal, favoriteSlugs, toggleFavorite } = useFavoriteOrchids();
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

  function openRandomOrchid() {
    const randomOrchid = orchids[Math.floor(Math.random() * orchids.length)];

    if (randomOrchid) {
      navigate(toOrchidDetailPath(randomOrchid.slug));
    }
  }

  return (
    <>
      <section className="flex flex-col gap-4 rounded-lg bg-mist p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-bark">
            Orchid Encyclopedia
          </p>
          <p className="mt-3 text-base leading-7 text-ink/80">
            Browse orchid varieties and learn their care needs.
          </p>
        </div>
        <button
          type="button"
          onClick={openRandomOrchid}
          disabled={isLoading || Boolean(errorMessage) || orchids.length === 0}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-rosy px-5 text-sm font-bold text-white transition hover:bg-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-rosy focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
        >
          Surprise me
        </button>
      </section>

      {recentlyViewedOrchids.length > 0 ? (
        <section
          aria-labelledby="recently-viewed-heading"
          className="rounded-lg bg-mist p-5 shadow-sm"
        >
          <h2
            id="recently-viewed-heading"
            className="text-sm font-medium uppercase tracking-wide text-bark"
          >
            Recently viewed
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recentlyViewedOrchids.map((recentOrchid) => (
              <li key={recentOrchid.slug}>
                <Link
                  to={toOrchidDetailPath(recentOrchid.slug)}
                  className="block rounded-md bg-white/70 px-4 py-3 transition hover:bg-peony/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-rosy"
                >
                  <span className="block font-semibold text-ink">{recentOrchid.commonName}</span>
                  <span className="mt-1 block text-sm italic text-bark">
                    {recentOrchid.scientificName}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {filterMetadata ? (
        <section className="rounded-lg bg-mist p-5 shadow-sm">
          <div className="flex flex-col gap-5">
            <label className="flex flex-col gap-2 text-sm font-medium text-bark">
              Search
              <input
                type="search"
                value={filters.q}
                onChange={(event) => updateFilter("q", event.target.value)}
                placeholder="Name, genus, care keyword"
                className="h-12 rounded-md bg-white px-4 text-base font-normal text-ink shadow-sm outline-none transition focus:ring-2 focus:ring-rosy"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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

            <div className="flex justify-end">
              <button
                type="button"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="h-10 rounded-md border border-moss/45 px-4 text-sm font-semibold text-rosy transition hover:border-rosy focus:outline-none focus-visible:ring-2 focus-visible:ring-rosy disabled:cursor-not-allowed disabled:opacity-45"
              >
                Clear filters
              </button>
            </div>
          </div>
        </section>
      ) : null}

      <FavoriteFeedback feedback={favoriteModal} onClose={closeFavoriteModal} />

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
                <OrchidCard
                  key={orchid.slug}
                  orchid={orchid}
                  isFavorite={favoriteSlugs.has(orchid.slug)}
                  onToggleFavorite={toggleFavorite}
                />
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
        className="h-11 rounded-md bg-white px-3 text-base font-normal text-ink shadow-sm outline-none transition focus:ring-2 focus:ring-rosy"
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
