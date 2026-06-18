const orchidDetailSlugPrefix = "orchid-detail-";

export function toOrchidDetailPath(slug: string) {
  return `/orchids/${orchidDetailSlugPrefix}${slug}`;
}

export function toApiOrchidSlug(routeSlug: string) {
  return routeSlug.startsWith(orchidDetailSlugPrefix)
    ? routeSlug.slice(orchidDetailSlugPrefix.length)
    : routeSlug;
}
