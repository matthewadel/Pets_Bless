"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { LoadingPage } from "@/components/loading";

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userStatus: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  saveUserData: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on app start by reading cookies
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const userCookie = getCookie("user");
    if (userCookie) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userCookie));
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch {
        // Remove invalid cookie
        document.cookie = "user=; path=/; max-age=0";
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Handle client-side redirects based on authentication state
    if (!isLoading && typeof window !== "undefined") {
      const currentPath = window.location.pathname;

      if (
        !isAuthenticated &&
        currentPath !== "/auth/register" &&
        currentPath !== "/auth/login"
      ) {
        router.push("/auth/register");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  const saveUserData = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    // Store user data in cookie only
    document.cookie = `user=${encodeURIComponent(
      JSON.stringify(user)
    )}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Remove cookie
    document.cookie = "user=; path=/; max-age=0";
    router.push("/auth/register");
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, saveUserData, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
