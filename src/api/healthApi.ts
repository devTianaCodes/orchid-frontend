import { getJson } from "./httpClient";

export type HealthResponse = {
  status: "ok";
  service: string;
};

export function getHealth() {
  return getJson<HealthResponse>("/health");
}
