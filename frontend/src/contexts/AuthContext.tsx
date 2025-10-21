import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "../services/api";
type User = { id: number; name: string; email: string; role: "admin"|"professor"|"student" };
type AuthCtx = { user: User | null; token: string | null; signIn: (email: string, password: string) => Promise<boolean>; signOut: () => Promise<void>; };
const Ctx = createContext<AuthCtx>({} as any);
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User|null>(null);
  const [token, setToken] = useState<string|null>(null);
  useEffect(() => { (async () => {
      const t = await SecureStore.getItemAsync("token"); const u = await SecureStore.getItemAsync("user");
      if (t && u) { setToken(t); setUser(JSON.parse(u)); api.defaults.headers.common["Authorization"] = `Bearer ${t}`; }
    })();
  }, []);
  const signIn = async (email: string, password: string) => {
    try { const { data } = await api.post("/auth/login", { email, password });
      setUser(data.user); setToken(data.access_token);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
      await SecureStore.setItemAsync("token", data.access_token); await SecureStore.setItemAsync("user", JSON.stringify(data.user));
      return true;
    } catch { return false; }
  };
  const signOut = async () => { setUser(null); setToken(null); delete api.defaults.headers.common["Authorization"]; await SecureStore.deleteItemAsync("token"); await SecureStore.deleteItemAsync("user"); };
  return <Ctx.Provider value={{ user, token, signIn, signOut }}>{children}</Ctx.Provider>;
};
export const useAuth = () => useContext(Ctx);
