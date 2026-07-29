import type { OrchidListItem } from "../api/orchidApi";

const recentlyViewedStorageKey = "orchidcare.recentlyViewedOrchids";
const maximumRecentlyViewedOrchids = 6;

export function readRecentlyViewedOrchids(): OrchidListItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedOrchids = window.localStorage.getItem(recentlyViewedStorageKey);

  if (!storedOrchids) {
    return [];
  }

  try {
    const parsedOrchids: unknown = JSON.parse(storedOrchids);

    return Array.isArray(parsedOrchids) ? parsedOrchids.filter(isOrchidListItem) : [];
  } catch {
    return [];
  }
}

export function recordRecentlyViewedOrchid(orchid: OrchidListItem) {
  if (typeof window === "undefined") {
    return;
  }

  const recentlyViewedOrchids = readRecentlyViewedOrchids();
  const nextOrchids = [
    orchid,
    ...recentlyViewedOrchids.filter((recentOrchid) => recentOrchid.slug !== orchid.slug),
  ].slice(0, maximumRecentlyViewedOrchids);

  window.localStorage.setItem(recentlyViewedStorageKey, JSON.stringify(nextOrchids));
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
    typeof orchid.shortDescription === "string" &&
    typeof orchid.isRare === "boolean" &&
    typeof orchid.growthType === "string" &&
    typeof orchid.difficulty === "string" &&
    typeof orchid.lightNeeds === "string" &&
    typeof orchid.wateringNeeds === "string" &&
    typeof orchid.bloomSeason === "string" &&
    (typeof orchid.imageUrl === "string" || orchid.imageUrl === null) &&
    (typeof orchid.imageAlt === "string" || orchid.imageAlt === null)
  );
}
