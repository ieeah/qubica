import { useEffect } from "react";
import type { DropdownProps } from "./dropdown.type";
import cn from "@/shared/utils/cn";
import useClickOutside from "@/shared/hooks/useClickOutside";
import styles from "./dropdown.module.css";

export default function Dropdown({
  isOpen,
  onClose,
  children,
  className,
  triggerRef,
}: DropdownProps) {
  const dropdownRef = useClickOutside<HTMLDivElement>(
    () => onClose?.(),
    isOpen && !!onClose,
    triggerRef ? [triggerRef] : [],
  );

  useEffect(() => {
    if (!isOpen || !onClose) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onClose();
      triggerRef?.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div ref={dropdownRef} className={cn(styles.menuPanel, className)}>
      {children}
    </div>
  );
}
