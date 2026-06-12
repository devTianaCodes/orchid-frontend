const fallbackApiBaseUrl = "http://localhost:3000/api";

export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? fallbackApiBaseUrl,
};
