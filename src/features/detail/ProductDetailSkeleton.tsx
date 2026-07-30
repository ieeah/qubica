import { Skeleton } from "@/shared/components/skeleton/Skeleton";
import styles from "./productdetail.module.css";

export default function ProductDetailSkeleton() {
  return (
    <div className="container py-4">
      <Skeleton.Rect w={220} h={16} rounded />

      <div className="row g-4 mt-2">
        <div className="col-12 col-md-6">
          <div className={styles.imageWrapper}>
            <Skeleton.Rect w="80%" h="80%" rounded />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className={styles.details}>
            <Skeleton.Rect w="90%" h={32} rounded />
            <Skeleton.Rect w={100} h={20} rounded />
            <Skeleton.Rect w={140} h={36} rounded />
            <Skeleton.Paragraph lines={4} />
          </div>
        </div>
      </div>
    </div>
  );
}
