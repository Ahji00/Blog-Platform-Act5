import React, { createContext, useState, useEffect, ReactNode } from "react";

export type User = { email: string } | null;

export type AuthContextType = {
  user: User;
  login: (data: { email: string }) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  // ✅ Load user from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Handle login and save to localStorage
  const login = (data: { email: string }) => {
    const userData = { email: data.email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ✅ Handle logout and clear localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
