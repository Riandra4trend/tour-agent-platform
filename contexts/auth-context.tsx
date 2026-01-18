'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User, LoginCredentials, RegisterCredentials, UserRole } from '@/lib/types';
import api from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      if (api.getAccessToken()) {
        const userData = await api.getCurrentUser();
        setUser(userData);
      } else {
        // Check for demo user in localStorage
        if (typeof window !== 'undefined') {
          const demoUser = localStorage.getItem('demo_user');
          if (demoUser) {
            try {
              setUser(JSON.parse(demoUser));
              return;
            } catch (e) {
              // Invalid demo user, continue to set null
            }
          }
        }
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      // Check for demo user in localStorage as fallback
      if (typeof window !== 'undefined') {
        const demoUser = localStorage.getItem('demo_user');
        if (demoUser) {
          try {
            setUser(JSON.parse(demoUser));
            return;
          } catch (e) {
            // Invalid demo user, continue to logout
          }
        }
      }
      api.logout();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await refreshUser();
      setIsLoading(false);
    };
    initAuth();
  }, [refreshUser]);

  const login = async (credentials: LoginCredentials) => {
    const response = await api.login(credentials);
    setUser(response.user);
  };

  const register = async (credentials: RegisterCredentials) => {
    const response = await api.register(credentials);
    setUser(response.user);
  };

  const logout = () => {
    api.logout();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('demo_user');
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useRequireAuth(allowedRoles?: UserRole[]) {
  const { user, isLoading, isAuthenticated } = useAuth();

  const isAuthorized = isAuthenticated && (!allowedRoles || (user && allowedRoles.includes(user.role)));

  return {
    user,
    isLoading,
    isAuthenticated,
    isAuthorized,
  };
}
