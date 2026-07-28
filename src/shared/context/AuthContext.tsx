import {
  useContext,
  createContext,
  useState,
  type ReactNode,
  useMemo,
} from "react";
import { type AuthContextType } from "@/shared/types/AuthContext";
import storage from "@/shared/utils/storage";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "qubica_jwt_token";

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [token, setTokenState] = useState<string | null>(() => {
    return storage.get(TOKEN_KEY);
  });

  const login = (newToken: string) => {
    storage.persist(TOKEN_KEY, newToken);
    setTokenState(newToken);
  };

  const logout = () => {
    storage.delete(TOKEN_KEY);
    setTokenState(null);
  };

  const contextValue = useMemo(
    () => ({
      isLogged: !!token,
      token,
      login,
      logout,
    }),
    [token],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider",
    );
  }

  return context;
};
