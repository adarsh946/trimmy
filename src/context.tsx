import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useFetch } from "./hooks/useFetch";
import { getCurrentUser } from "./database/apiAuth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);
  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, isAuthenticated, user, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const AuthState = () => {
  return useContext(AuthContext);
};
