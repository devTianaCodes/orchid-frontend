import type { OrchidListItem } from "../api/orchidApi";

const favoriteOrchidsStorageKey = "orchidcare.favoriteOrchids";
export const favoriteOrchidsChangedEventName = "orchidcare:favorites-changed";

type StoredOrchidListItem = Omit<OrchidListItem, "isRare"> & {
  isRare?: boolean;
};

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

    return parsedFavorites.flatMap(normalizeOrchidListItem);
  } catch {
    return [];
  }
}

export function saveFavoriteOrchids(favorites: OrchidListItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(favoriteOrchidsStorageKey, JSON.stringify(favorites));
  window.dispatchEvent(new Event(favoriteOrchidsChangedEventName));
}

export function toggleFavoriteOrchid(orchid: OrchidListItem, favorites: OrchidListItem[]) {
  const isAlreadyFavorite = favorites.some((favorite) => favorite.slug === orchid.slug);

  if (isAlreadyFavorite) {
    return favorites.filter((favorite) => favorite.slug !== orchid.slug);
  }

  return [orchid, ...favorites];
}

function isStoredOrchidListItem(value: unknown): value is StoredOrchidListItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const orchid = value as Partial<StoredOrchidListItem>;

  return (
    typeof orchid.slug === "string" &&
    typeof orchid.commonName === "string" &&
    typeof orchid.scientificName === "string" &&
    typeof orchid.genus === "string" &&
    typeof orchid.shortDescription === "string" &&
    (typeof orchid.isRare === "boolean" || orchid.isRare === undefined)
  );
}

function normalizeOrchidListItem(value: unknown): OrchidListItem[] {
  if (!isStoredOrchidListItem(value)) {
    return [];
  }

  return [
    {
      ...value,
      isRare: value.isRare ?? false,
    },
  ];
}
