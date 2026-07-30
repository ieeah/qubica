import { useCallback } from "react";

export default function useScroll() {
  const scrollToElement = useCallback(
    (target: string | HTMLElement | null, offset: number = 100) => {
      let element: HTMLElement | null = null;
      if (typeof target === "string") {
        element = document.getElementById(target) || document.querySelector(target);
      } else {
        element = target;
      }

      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    },
    []
  );

  const scrollToTop = useCallback((options?: ScrollToOptions) => {
    window.scrollTo({ top: 0, behavior: "smooth", ...options });
  }, []);

  return { scrollToElement, scrollToTop };
}
