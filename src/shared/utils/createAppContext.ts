import { createContext, useContext } from "react";

/**
 * Utility per creare un React Context ed il relativo custom hook in totale sicurezza.
 * Se l'hook viene invocato al di fuori del suo Provider, lancia un errore descrittivo.
 *
 * @param name Nome identificativo del contesto (es. "AuthContext" o "Auth")
 * @returns Tupla `[Context, useCustomHook]`
 *
 * @example
 * const [AuthContext, useAuthContext] = createAppContext<AuthContextType>("AuthContext");
 */
export default function createAppContext<T>(name?: string, defaultValue?: T) {
  const Context = createContext<T | undefined>(defaultValue);

  if (name) {
    Context.displayName = name;
  }

  const useAppScope = (): T => {
    const context = useContext(Context);

    if (context === undefined) {
      if (!name) {
        throw new Error("useContext must be used within its Provider");
      }
      const cleanName = name.replace(/^use/, "").replace(/Context$/, "");
      throw new Error(
        `use${cleanName}Context must be used within an ${cleanName}ContextProvider`
      );
    }

    return context;
  };

  return [Context, useAppScope] as const;
}