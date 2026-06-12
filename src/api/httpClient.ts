import { apiConfig } from "./config";

export async function getJson<TResponse>(path: string): Promise<TResponse> {
  const response = await fetch(`${apiConfig.baseUrl}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<TResponse>;
}
