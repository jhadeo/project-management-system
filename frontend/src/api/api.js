import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL?.trim();

if (!apiBaseUrl) {
  throw new Error("VITE_API_URL is required");
}

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Accept: "application/json",
  },
});

export default api;
