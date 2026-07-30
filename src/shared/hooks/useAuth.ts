import { useCallback } from "react";
import useFakeStore from "./useFakeStore";
import useRequest from "./useRequest";
import { useAuthContext } from "@/shared/context/AuthContext";
import type { LoginCredentials } from "@/shared/types/fakestore/auth";

export default function useAuth() {
  const { store } = useFakeStore();
  const { isLogged, token, login: setToken, logout: clearToken } = useAuthContext();

  const [error, , isLoading, doLogin] = useRequest(store.auth.login);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const [err, data] = await doLogin(credentials);
      if (!err && data) {
        setToken(data.token);
      }
      return [err, data] as const;
    },
    [doLogin, setToken],
  );

  const logout = useCallback(() => {
    clearToken();
  }, [clearToken]);

  return { isLogged, token, login, logout, isLoading, error };
}
