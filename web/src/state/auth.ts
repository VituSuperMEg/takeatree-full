import { create } from "zustand";
import { api } from "../services/api";

interface IAuthentication {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<IAuthentication>((set) => ({
  isAuthenticated: false,
  token: localStorage.getItem("token") || null, // Recupera o token do localStorage, se existir
  login: async (email: string, password: string) => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      if (response.data) {
        set({ isAuthenticated: true });
       
        const token = response.headers.authorization.split(" ")[1];
        console.log(token);
        localStorage.setItem("token", token);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  },
  logout: async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("token");
      set({ isAuthenticated: false, token: null });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  },
}));
