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

const extractData = (payload: Record<string, unknown>) => {
  return (
    payload.data ??
    payload.class ??
    payload.enrollment ??
    payload.department ??
    payload.subject ??
    payload.user ??
    payload.teacher ??
    payload.student ??
    payload
  );
};

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,
    buildHeaders: async () => getAuthHeaders(),
    buildQueryParams: async ({ pagination, filters }) => {
      const page = pagination?.currentPage ?? 1;
      const pageSize = pagination?.pageSize ?? 10;
      const params: Record<string, string | number> = { page, limit: pageSize };
      filters?.forEach((filter) => {
        const field = "field" in filter ? filter.field : "";
        const value = String(filter.value ?? "");
        if (!value || value === "all") return;

        if (field === "department" || field === "departmentId") {
          params.department = value;
          params.departmentId = value;
        } else if (field === "subject" || field === "subjectId") {
          params.subjectId = value;
        } else if (field === "teacher" || field === "teacherId") {
          params.teacherId = value;
        } else if (field === "class" || field === "classId") {
          params.classId = value;
        } else if (field === "student" || field === "studentId") {
          params.studentId = value;
        } else if (
          field === "search" ||
          field === "name" ||
          field === "code" ||
          field === "email" ||
          field === "q"
        ) {
          params.search = value;
        } else if (field === "status") {
          params.status = value;
        } else if (field === "role") {
          params.role = value;
        }
      });
      return params;
    },

    mapResponse: async (response) => {
      const payload: ListResponse = await response.clone().json();
      const list =
        payload.data ??
        payload.classes ??
        payload.enrollments ??
        payload.subjects ??
        (payload as Record<string, unknown>).departments ??
        (payload as Record<string, unknown>).users ??
        (payload as Record<string, unknown>).teachers ??
        (payload as Record<string, unknown>).students ??
        [];
      return (Array.isArray(list) ? list : []) as any[];
    },

    getTotalCount: async (response) => {
      const payload: ListResponse = await response.clone().json();
      return (
        payload.pagination?.total ??
        (Array.isArray(payload.data) ? payload.data.length : 0)
      );
    },
  },
  getOne: {
    buildHeaders: async () => getAuthHeaders(),
    mapResponse: async (response) => {
      const payload = await response.clone().json();
      return extractData(payload as Record<string, unknown>);
    },
  },
  create: {
    buildHeaders: async () => getAuthHeaders(),
    mapResponse: async (response) => {
      const payload = await response.clone().json();
      return extractData(payload as Record<string, unknown>);
    },
  },
  update: {
    buildHeaders: async () => getAuthHeaders(),
    mapResponse: async (response) => {
      const payload = await response.clone().json();
      return extractData(payload as Record<string, unknown>);
    },
  },
  deleteOne: {
    buildHeaders: async () => getAuthHeaders(),
    mapResponse: async (response) => {
      const payload = await response.clone().json();
      return (payload as Record<string, unknown>).data ?? payload;
    },
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
