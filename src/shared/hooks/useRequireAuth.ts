import { useCallback, useState } from "react";
import { useAuthContext } from "@/shared/context/AuthContext";

export default function useRequireAuth() {
  const { isLogged } = useAuthContext();
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);

  const requireAuth = useCallback(
    (action: () => void) => {
      if (isLogged) {
        action();
        return;
      }
      setIsLoginPromptOpen(true);
    },
    [isLogged],
  );

  const closeLoginPrompt = useCallback(() => setIsLoginPromptOpen(false), []);

  return { isLoginPromptOpen, requireAuth, closeLoginPrompt };
}
