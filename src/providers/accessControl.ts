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

    // ADMIN: Full administrative access
    if (role === "ADMIN") {
      return { can: true };
    }

    // TEACHER: View subjects/classes, edit own class, cannot create subjects/classes or manage users
    if (role === "TEACHER") {
      if (resource === "dashboard") {
        return { can: true };
      }
      if (resource === "subjects") {
        if (action === "list" || action === "show") {
          return { can: true };
        }
        return { can: false, reason: "Teachers cannot create or modify subjects." };
      }
      if (resource === "classes") {
        if (action === "list" || action === "show" || action === "edit") {
          return { can: true };
        }
        return { can: false, reason: "Teachers cannot create new classes directly." };
      }
      if (resource === "users") {
        return { can: false, reason: "Teachers cannot manage institutional users." };
      }
    }

    // STUDENT: Read-only for subjects and classes, cannot create or edit
    if (role === "STUDENT") {
      if (resource === "dashboard") {
        return { can: true };
      }
      if (resource === "subjects" || resource === "classes") {
        if (action === "list" || action === "show") {
          return { can: true };
        }
        return { can: false, reason: "Students have read-only access to portal resources." };
      }
      if (resource === "users") {
        return { can: false, reason: "Students cannot view or manage other users." };
      }
    }

    return { can: true };
  },
};
