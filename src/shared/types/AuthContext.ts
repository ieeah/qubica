export type AuthContextType = {
  isLogged: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};