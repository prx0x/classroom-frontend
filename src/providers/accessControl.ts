import type { AccessControlProvider } from "@refinedev/core";
import { AUTH_USER_KEY, type IdentityUser } from "./auth";

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action }) => {
    const cached = localStorage.getItem(AUTH_USER_KEY);
    let role: "ADMIN" | "TEACHER" | "STUDENT" = "STUDENT";

    if (cached) {
      try {
        const parsed = JSON.parse(cached) as IdentityUser;
        if (parsed.role) {
          role = parsed.role;
        }
      } catch {
        // Fall back to STUDENT default
      }
    }

    // ADMIN: Full administrative access across all portal resources
    if (role === "ADMIN") {
      return { can: true };
    }

    // TEACHER: Access to Dashboard, Classes, Schedules, and Rosters; no institutional admin
    if (role === "TEACHER") {
      if (resource === "dashboard" || resource === "schedules") {
        return { can: true };
      }
      if (resource === "departments" || resource === "subjects") {
        if (action === "show") {
          return { can: true };
        }
        return {
          can: false,
          reason: "Teachers cannot manage institutional departments/subjects in navigation.",
        };
      }
      if (resource === "classes") {
        if (action === "list" || action === "show" || action === "edit") {
          return { can: true };
        }
        return {
          can: false,
          reason: "Teachers cannot create new classes directly.",
        };
      }
      if (resource === "enrollments") {
        if (action === "list" || action === "show") {
          return { can: true };
        }
        return {
          can: false,
          reason: "Teachers cannot create or delete global enrollments directly.",
        };
      }
      if (
        resource === "teachers" ||
        resource === "students" ||
        resource === "users"
      ) {
        return {
          can: false,
          reason: "Teachers cannot access institutional user management.",
        };
      }
    }

    // STUDENT: Access to Dashboard, Classes, Schedules, and Enrollments; no user or institutional management
    if (role === "STUDENT") {
      if (resource === "dashboard" || resource === "schedules") {
        return { can: true };
      }
      if (resource === "departments" || resource === "subjects") {
        if (action === "show") {
          return { can: true };
        }
        return {
          can: false,
          reason: "Students do not manage institutional departments or subjects.",
        };
      }
      if (resource === "classes") {
        if (action === "list" || action === "show") {
          return { can: true };
        }
        return {
          can: false,
          reason: "Students have read-only access to academic resources.",
        };
      }
      if (resource === "enrollments") {
        if (action === "list" || action === "show" || action === "create") {
          return { can: true };
        }
        return {
          can: false,
          reason: "Students cannot edit or delete arbitrary enrollments.",
        };
      }
      if (
        resource === "teachers" ||
        resource === "students" ||
        resource === "users"
      ) {
        return {
          can: false,
          reason: "Students cannot view or manage other users.",
        };
      }
    }

    return { can: true };
  },
};
