import { getJson } from "./httpClient";

export type OrchidGrowthType = "epiphyte" | "terrestrial" | "lithophyte" | "semi-terrestrial";

export type OrchidDifficulty = "beginner" | "intermediate" | "advanced";

export type OrchidLightNeeds = "low" | "medium" | "bright-indirect" | "high";

export type OrchidWateringNeeds = "low" | "moderate" | "frequent";

export type OrchidBloomSeason = "winter" | "spring" | "summer" | "autumn" | "varies";

export type OrchidListItem = {
  slug: string;
  commonName: string;
  scientificName: string;
  genus: string;
  shortDescription: string;
  growthType: OrchidGrowthType;
  difficulty: OrchidDifficulty;
  lightNeeds: OrchidLightNeeds;
  wateringNeeds: OrchidWateringNeeds;
  bloomSeason: OrchidBloomSeason;
  imageUrl: string | null;
  imageAlt: string | null;
};

export type OrchidDetail = OrchidListItem & {
  nativeRegion: string;
  humidityMinPercent: number;
  humidityMaxPercent: number;
  temperatureMinCelsius: number;
  temperatureMaxCelsius: number;
  pottingMedium: string;
  bloomNotes: string;
  careSummary: string;
  imageSourceUrl: string | null;
  imageLicense: string | null;
  imageAttribution: string | null;
};

export type OrchidListFilters = {
  q?: string;
  difficulty?: OrchidDifficulty;
  light?: OrchidLightNeeds;
  water?: OrchidWateringNeeds;
  humidity?: number;
  temperature?: number;
  growthType?: OrchidGrowthType;
  bloomSeason?: OrchidBloomSeason;
  page?: number;
  pageSize?: number;
};

export type OrchidListPagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type OrchidListResponse = {
  orchids: OrchidListItem[];
  pagination: OrchidListPagination;
};

export type OrchidDetailResponse = {
  orchid: OrchidDetail;
};

export type OrchidFilterOption<TValue extends string = string> = {
  value: TValue;
  label: string;
};

export type OrchidFilterMetadataResponse = {
  filters: {
    difficulties: Array<OrchidFilterOption<OrchidDifficulty>>;
    lightNeeds: Array<OrchidFilterOption<OrchidLightNeeds>>;
    wateringNeeds: Array<OrchidFilterOption<OrchidWateringNeeds>>;
    growthTypes: Array<OrchidFilterOption<OrchidGrowthType>>;
    bloomSeasons: Array<OrchidFilterOption<OrchidBloomSeason>>;
    humidityPercentRange: {
      min: number;
      max: number;
    };
    temperatureCelsiusRange: {
      min: number;
      max: number;
    };
  };
};

export function listOrchids(filters: OrchidListFilters = {}) {
  const searchParams = new URLSearchParams();

  addSearchParam(searchParams, "q", filters.q);
  addSearchParam(searchParams, "difficulty", filters.difficulty);
  addSearchParam(searchParams, "light", filters.light);
  addSearchParam(searchParams, "water", filters.water);
  addSearchParam(searchParams, "humidity", filters.humidity);
  addSearchParam(searchParams, "temperature", filters.temperature);
  addSearchParam(searchParams, "growthType", filters.growthType);
  addSearchParam(searchParams, "bloomSeason", filters.bloomSeason);
  addSearchParam(searchParams, "page", filters.page);
  addSearchParam(searchParams, "pageSize", filters.pageSize);

  const query = searchParams.toString();

  return getJson<OrchidListResponse>(query ? `/orchids?${query}` : "/orchids");
}

export function getOrchidBySlug(slug: string) {
  return getJson<OrchidDetailResponse>(`/orchids/${slug}`);
}

export function getOrchidFilters() {
  return getJson<OrchidFilterMetadataResponse>("/orchid-filters");
}

function addSearchParam(
  searchParams: URLSearchParams,
  name: string,
  value: number | string | undefined,
) {
  if (value === undefined || value === "") {
    return;
  }

  searchParams.set(name, String(value));
}
