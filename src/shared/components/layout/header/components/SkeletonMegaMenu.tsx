import { Skeleton } from "../../../skeleton/Skeleton";
import styles from "./megamenu.module.css";
import cn from "@/shared/utils/cn";

export default function SkeletonMegaMenu() {
  return (
    <>
      <div className={cn(styles.mainCategory, "col-12 col-md-6")}>
        <div className={styles.mainCategoryContent}>
          <div className="mb-2">
            <Skeleton.Rect w="160px" h="30px" rounded />
          </div>
          <Skeleton.Rect w="120px" h="30px" rounded />
        </div>
      </div>

      <div className={cn(styles.otherCategories, "col-12 col-md-6")}>
        <h4>Esplora</h4>
        <ul>
          {Array.from({ length: 4 }).map((_, i) => {
            const ws = [80, 85, 90, 95];
            const randomW = ws[Math.floor(Math.random() * ws.length)];
            return (
              <li key={i}>
                <Skeleton.Rect w={`${randomW}%`} h="20px" rounded />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
