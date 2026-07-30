import { Skeleton } from '@/shared/components/skeleton/Skeleton';
import styles from './categoriesgrid.module.css';

export default function CategoriesSkeleton() {
  return (
    <section className={styles.section} style={{ padding: '4rem 1rem' }}>
      <div className={styles.sectionTitle} style={{ display: 'flex', justifyContent: 'center' }}>
         <Skeleton.Rect w={250} h={36} rounded />
      </div>
      <div className={styles.grid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Skeleton.Rect w="100%" h="100%" />
            </div>
            <div className={styles.cardContent} style={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}>
              <Skeleton.Rect w="60%" h={24} rounded />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
