import { Skeleton } from "../../skeleton/Skeleton";
import styles from "../header.module.css";

export default function HeaderSkeleton() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <div className={styles.left}>
          <Skeleton.Rect w={120} h={32} rounded />
        </div>
        <div className={styles.center}>
          <Skeleton.Rect w={350} h={44} rounded />
        </div>
        <div className={styles.right}>
          <Skeleton.Rect w={80} h={24} rounded />
          <Skeleton.Circle radius={20} />
        </div>
      </div>
    </header>
  );
}
