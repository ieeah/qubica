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

  if (!isOpen) return null;

  return (
    <div ref={dropdownRef} className={cn(styles.menuPanel, className)}>
      {children}
    </div>
  );
}
