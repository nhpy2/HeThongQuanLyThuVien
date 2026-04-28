"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const loginUser = (data: any) => {
    localStorage.setItem("auth", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);