import type { AuthProvider } from "@refinedev/core";
import { BACKEND_BASE_URL } from "@/constants";

export const AUTH_TOKEN_KEY = "classroom_auth_token";
export const AUTH_USER_KEY = "classroom_auth_user";

export interface IdentityUser {
  id: string;
  name: string;
  fullName: string;
  email: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
  avatar?: string | null;
  image?: string | null;
  departmentId?: number | null;
}

function getAuthHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/auth/sign-in/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message =
          errorData.message ||
          errorData.error ||
          "Invalid email or password. Please try again.";
        return {
          success: false,
          error: {
            name: "LoginError",
            message,
          },
        };
      }

      const payload = await response.json();
      const token = payload.token || payload.session?.token;
      if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
      }

      if (payload.user) {
        const rawRole = payload.user.role || "STUDENT";
        const normalizedRole = rawRole.toUpperCase() as "ADMIN" | "TEACHER" | "STUDENT";
        const identity: IdentityUser = {
          id: payload.user.id,
          name: payload.user.name,
          fullName: payload.user.name,
          email: payload.user.email,
          role: normalizedRole,
          avatar: payload.user.image,
          image: payload.user.image,
          departmentId: payload.user.departmentId,
        };
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(identity));
      }

      return {
        success: true,
        redirectTo: "/portal",
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Network error during authentication";
      return {
        success: false,
        error: {
          name: "NetworkError",
          message,
        },
      };
    }
  },

  logout: async () => {
    try {
      await fetch(`${BACKEND_BASE_URL}/auth/sign-out`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
      }).catch(() => {
        // Suppress network errors on logout to allow clean local cleanup
      });
    } finally {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/auth/get-session`, {
        method: "GET",
        headers: getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        return {
          authenticated: false,
          redirectTo: "/login",
          logout: true,
        };
      }

      const session = await response.json();
      if (!session || !session.user) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        return {
          authenticated: false,
          redirectTo: "/login",
          logout: true,
        };
      }

      const rawRole = session.user.role || "STUDENT";
      const normalizedRole = rawRole.toUpperCase() as "ADMIN" | "TEACHER" | "STUDENT";
      const identity: IdentityUser = {
        id: session.user.id,
        name: session.user.name,
        fullName: session.user.name,
        email: session.user.email,
        role: normalizedRole,
        avatar: session.user.image,
        image: session.user.image,
        departmentId: session.user.departmentId,
      };
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(identity));

      return {
        authenticated: true,
      };
    } catch {
      // If server unreachable but token exists, verify fallback
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        return { authenticated: true };
      }
      return {
        authenticated: false,
        redirectTo: "/login",
        logout: true,
      };
    }
  },

  getIdentity: async (): Promise<IdentityUser | null> => {
    const cached = localStorage.getItem(AUTH_USER_KEY);
    if (cached) {
      try {
        return JSON.parse(cached) as IdentityUser;
      } catch {
        // Fall through to server fetch
      }
    }

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/auth/get-session`, {
        method: "GET",
        headers: getAuthHeaders(),
        credentials: "include",
      });

      if (response.ok) {
        const session = await response.json();
        if (session?.user) {
          const rawRole = session.user.role || "STUDENT";
          const normalizedRole = rawRole.toUpperCase() as "ADMIN" | "TEACHER" | "STUDENT";
          const identity: IdentityUser = {
            id: session.user.id,
            name: session.user.name,
            fullName: session.user.name,
            email: session.user.email,
            role: normalizedRole,
            avatar: session.user.image,
            image: session.user.image,
            departmentId: session.user.departmentId,
          };
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(identity));
          return identity;
        }
      }
    } catch {
      // Return null on failure
    }

    return null;
  },

  getPermissions: async () => {
    const cached = localStorage.getItem(AUTH_USER_KEY);
    if (cached) {
      try {
        const user = JSON.parse(cached) as IdentityUser;
        return user.role;
      } catch {
        // ignore
      }
    }
    return null;
  },

  onError: async (error) => {
    if (error?.status === 401 || error?.statusCode === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      return {
        logout: true,
        redirectTo: "/login",
      };
    }
    return { error };
  },
};
