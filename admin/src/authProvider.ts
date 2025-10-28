import { AuthProvider } from "react-admin";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const { user, token } = await response.json();

      if (user.role !== "ADMIN") {
        throw new Error("Access denied: Admin privileges required");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return Promise.resolve();
  },

  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      return Promise.reject();
    }

    try {
      const user = JSON.parse(userStr);
      if (user.role !== "ADMIN") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return Promise.reject({ message: "Admin access required" });
      }
      return Promise.resolve();
    } catch {
      return Promise.reject();
    }
  },

  getPermissions: () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      return Promise.reject();
    }

    try {
      const user = JSON.parse(userStr);
      return Promise.resolve(user.role);
    } catch {
      return Promise.reject();
    }
  },

  getIdentity: () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      return Promise.reject();
    }

    try {
      const user = JSON.parse(userStr);
      return Promise.resolve({
        id: user.id,
        fullName: user.name,
        avatar: undefined,
      });
    } catch {
      return Promise.reject();
    }
  },
};
