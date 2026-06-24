import { useEffect, useRef, useState, type MouseEvent } from "react";

import { listOrchids, type OrchidListItem, type OrchidListPagination } from "../api/orchidApi";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { FavoriteFeedback } from "../components/FavoriteFeedback";
import { LoadingState } from "../components/LoadingState";
import { OrchidCard } from "../components/OrchidCard";
import { PaginationControls } from "../components/PaginationControls";
import {
  readFavoriteOrchids,
  saveFavoriteOrchids,
  toggleFavoriteOrchid,
} from "../utils/favoriteOrchids";
import { createFavoriteModal, type FavoriteModalState } from "../utils/favoriteModal";

const orchidPageSize = 12;

export function RareOrchidsPage() {
  const [orchids, setOrchids] = useState<OrchidListItem[]>([]);
  const [pagination, setPagination] = useState<OrchidListPagination | null>(null);
  const [favoriteOrchids, setFavoriteOrchids] = useState<OrchidListItem[]>(readFavoriteOrchids);
  const [favoriteModal, setFavoriteModal] = useState<FavoriteModalState | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadRareOrchids() {
      setIsLoading(true);

      try {
        const response = await listOrchids({
          isRare: true,
          page,
          pageSize: orchidPageSize,
        });

        if (isMounted) {
          setOrchids(response.orchids);
          setPagination(response.pagination);
          setErrorMessage(null);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "Unable to load rare orchids.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadRareOrchids();

    return () => {
      isMounted = false;
    };
  }, [page]);

  const favoriteSlugs = new Set(favoriteOrchids.map((orchid) => orchid.slug));

  function changePage(nextPage: number) {
    setPage(nextPage);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleFavorite(orchid: OrchidListItem, event: MouseEvent<HTMLButtonElement>) {
    setFavoriteOrchids((currentFavorites) => {
      const isAlreadyFavorite = currentFavorites.some((favorite) => favorite.slug === orchid.slug);
      const nextFavorites = toggleFavoriteOrchid(orchid, currentFavorites);

      saveFavoriteOrchids(nextFavorites);
      setFavoriteModal(
        createFavoriteModal(
          isAlreadyFavorite ? "Removed from favourite" : "Added to favourite",
          event,
        ),
      );

      return nextFavorites;
    });
  }

  return (
    <>
      <section className="rounded-lg bg-mist p-5 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-bark">Rare Collection</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">Rare Orchids</h1>
      </section>

      <FavoriteFeedback feedback={favoriteModal} onClose={() => setFavoriteModal(null)} />

      {isLoading ? <LoadingState label="Loading rare orchids" /> : null}

      {!isLoading && errorMessage ? (
        <ErrorState
          title="Could not load rare orchids"
          message="Start the backend server and refresh the page."
        />
      ) : null}

      <div ref={resultsRef}>
        {!isLoading && !errorMessage && orchids.length === 0 ? (
          <EmptyState
            title="No rare orchids yet"
            message="Rare orchid profiles will appear here after seed data is loaded."
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
