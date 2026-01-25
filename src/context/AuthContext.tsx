import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthState, UserRole } from "@/types";
import { StorageService } from "@/lib/storage";

interface AuthContextType extends AuthState {
  login: (username: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, role: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = StorageService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string): Promise<boolean> => {
    const users = StorageService.getUsers();
    const foundUser = users.find((u) => u.username === username);

    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      StorageService.setCurrentUser(foundUser);
      return true;
    }
    return false;
  };

  const register = async (username: string, role: UserRole): Promise<boolean> => {
    const users = StorageService.getUsers();
    if (users.some((u) => u.username === username)) {
      return false; // Already exists
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      username,
      role,
      createdAt: new Date().toISOString(),
    };

    StorageService.saveUser(newUser);
    // Auto login
    setUser(newUser);
    setIsAuthenticated(true);
    StorageService.setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    StorageService.setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
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
