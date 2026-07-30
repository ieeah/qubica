import { useCallback } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => void;
};

export default function useViewTransitionNavigate() {
  const navigate = useNavigate();

  return useCallback(
    (to: string) => {
      const doc = document as DocumentWithViewTransition;

      if (!doc.startViewTransition) {
        navigate(to);
        return;
      }

      doc.startViewTransition(() => {
        flushSync(() => {
          navigate(to);
        });
      });
    },
    [navigate],
  );
}
