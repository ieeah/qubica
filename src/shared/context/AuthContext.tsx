import { useContext, createContext, useState } from "react";

import { type AuthContext } from "../types/AuthContext";

// const AuthContext = createContext<AuthContext>({
//   isLogged: false,
//   setIsLogged: () => {},
// });

// export default function AuthContextProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isLogged, setIsLogged] = useState(false);

//   return (
//     <AuthContext.Provider value={{ isLogged, setIsLogged }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);


const AuthContext = createContext();

export default function AuthContextProvider({ children, session }) {
  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return context;
};
