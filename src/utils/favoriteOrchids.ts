import type { OrchidListItem } from "../api/orchidApi";

const favoriteOrchidsStorageKey = "orchidcare.favoriteOrchids";

export function readFavoriteOrchids() {
  if (typeof window === "undefined") {
    return [];
  }

  const storedFavorites = window.localStorage.getItem(favoriteOrchidsStorageKey);

  if (!storedFavorites) {
    return [];
  }

  try {
    const parsedFavorites: unknown = JSON.parse(storedFavorites);

    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    return parsedFavorites.filter(isOrchidListItem);
  } catch {
    return [];
  }
}

export function saveFavoriteOrchids(favorites: OrchidListItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(favoriteOrchidsStorageKey, JSON.stringify(favorites));
}

export function toggleFavoriteOrchid(orchid: OrchidListItem, favorites: OrchidListItem[]) {
  const isAlreadyFavorite = favorites.some((favorite) => favorite.slug === orchid.slug);

  if (isAlreadyFavorite) {
    return favorites.filter((favorite) => favorite.slug !== orchid.slug);
  }

  return [orchid, ...favorites];
}

function isOrchidListItem(value: unknown): value is OrchidListItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const orchid = value as Partial<OrchidListItem>;

  return (
    typeof orchid.slug === "string" &&
    typeof orchid.commonName === "string" &&
    typeof orchid.scientificName === "string" &&
    typeof orchid.genus === "string" &&
    typeof orchid.shortDescription === "string"
  );
}
