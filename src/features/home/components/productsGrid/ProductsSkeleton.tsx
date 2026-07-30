import { Skeleton } from "@/shared/components/skeleton/Skeleton";
import styles from "./productsgrid.module.css";
import type { ProductsSkeletonProps } from "./productsGrid.type";

export default function ProductsSkeleton({ count = 8 }: ProductsSkeletonProps) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeletonCard}>
          <Skeleton.Rect w="100%" h="200px" rounded />
          <div style={{ marginTop: "1rem" }}>
            <Skeleton.Rect w="90%" h="20px" rounded />
            <div style={{ marginTop: "0.5rem" }}>
              <Skeleton.Rect w="40%" h="16px" rounded />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
