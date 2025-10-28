import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils, DataProvider } from "react-admin";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const token = localStorage.getItem("token");

  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  if (token) {
    (options.headers as Headers).set("Authorization", `Bearer ${token}`);
  }

  return fetchUtils.fetchJson(url, options);
};

export const dataProvider: DataProvider = simpleRestProvider(
  `${API_URL}/api`,
  httpClient,
);
