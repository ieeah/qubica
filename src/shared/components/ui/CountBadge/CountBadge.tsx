import type { CountBadgeProps } from "./countbadge.type";
import styles from "./countbadge.module.css";

export default function CountBadge({ count }: CountBadgeProps) {
  if (count < 1) return null;

  return (
    <span className={styles.badge} aria-hidden="true">
      {count}
    </span>
  );
}
