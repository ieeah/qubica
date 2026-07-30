import { useEffect, useRef, type RefObject } from "react";

export default function useClickOutside<T extends HTMLElement = HTMLElement>(
  onClickOutside: () => void,
  enabled: boolean = true,
  ignoreRefs: RefObject<HTMLElement | null>[] = [],
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      const isInsideTarget = !!ref.current?.contains(target);
      const isInsideIgnored = ignoreRefs.some((ignoredRef) =>
        ignoredRef.current?.contains(target),
      );

      if (!isInsideTarget && !isInsideIgnored) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, onClickOutside, ...ignoreRefs]);

  return ref;
}
