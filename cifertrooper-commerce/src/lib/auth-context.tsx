import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiPost } from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const AUTH_KEY = "ct_auth_v1";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, _password: string) => {
    // DUAL MODE: API Login (uncomment when backend is ready)
    /*
    const res = await apiPost<User>("/api/auth/login", { email, password });
    setUser(res);
    localStorage.setItem(AUTH_KEY, JSON.stringify(res));
    return;
    */

    // Static fallback: create a mock user from the email
    const mockUser: User = {
      id: `user_${Date.now()}`,
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      email,
    };
    setUser(mockUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string, _password: string) => {
    // DUAL MODE: API Register (uncomment when backend is ready)
    /*
    const res = await apiPost<User>("/api/auth/register", { name, email, password });
    setUser(res);
    localStorage.setItem(AUTH_KEY, JSON.stringify(res));
    return;
    */

    // Static fallback
    const mockUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
    };
    setUser(mockUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(mockUser));
  };

  const logout = () => {
    // DUAL MODE: API Logout (uncomment when backend is ready)
    /*
    apiPost("/api/auth/logout", {}).catch(console.error);
    */

    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem(AUTH_KEY, JSON.stringify(updated));

    // DUAL MODE: API Profile Update (uncomment when backend is ready)
    /*
    apiPost("/api/user/profile", data).catch(console.error);
    */
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
