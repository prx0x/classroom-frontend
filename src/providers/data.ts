import { BACKEND_BASE_URL } from "@/constants";
import { ListResponse } from "@/types";
import {
  createDataProvider,
  type CreateDataProviderOptions,
} from "@refinedev/rest";
import type { Options as KyOptions } from "ky";
import { AUTH_TOKEN_KEY } from "./auth";

if (!BACKEND_BASE_URL) {
  throw new Error("VITE_BACKEND_BASE_URL is not defined");
}

const getAuthHeaders = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,
    buildHeaders: async () => getAuthHeaders(),
    buildQueryParams: async ({ resource, pagination, filters }) => {
      const page = pagination?.currentPage ?? 1;
      const pageSize = pagination?.pageSize ?? 10;
      const params: Record<string, string | number> = { page, limit: pageSize };
      filters?.forEach((filter) => {
        const field = "field" in filter ? filter.field : "";
        const value = String(filter.value);
        if (resource === "subjects") {
          if (field === "department") params.department = value;
          if (field === "name" || field === "code") params.search = value;
        }
      });
      return params;
    },

    mapResponse: async (response) => {
      const payload: ListResponse = await response.clone().json();
      return payload.data ?? payload.subjects ?? [];
    },

    getTotalCount: async (response) => {
      const payload: ListResponse = await response.clone().json();
      return payload.pagination?.total ?? payload.data?.length ?? 0;
    },
  },
  getOne: {
    buildHeaders: async () => getAuthHeaders(),
  },
  create: {
    buildHeaders: async () => getAuthHeaders(),
  },
  update: {
    buildHeaders: async () => getAuthHeaders(),
  },
  deleteOne: {
    buildHeaders: async () => getAuthHeaders(),
  },
};

const kyOptions: KyOptions = {
  credentials: "include",
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
};

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options, kyOptions);

export { dataProvider };
