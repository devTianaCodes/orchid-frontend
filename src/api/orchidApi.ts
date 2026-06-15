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

export type OrchidListResponse = {
  orchids: OrchidListItem[];
};

export function listOrchids() {
  return getJson<OrchidListResponse>("/orchids");
}
