import { Skeleton } from '@/shared/components/skeleton/Skeleton';
import styles from './hero.module.css';

export default function HeroSkeleton() {
  return (
    <section className="container" style={{ padding: '2rem 1rem' }}>
      <div className={styles.heroCard} style={{ backgroundColor: 'var(--bg-canvas)' }}>
        <Skeleton.Rect w="100%" h="100%" />
        <div className={styles.overlay}>
          <div className={styles.content}>
            <div className={styles.textContent}>
              <Skeleton.Rect w={250} h={40} rounded />
              <div style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                <Skeleton.Paragraph lines={2} />
              </div>
              <Skeleton.Rect w={150} h={45} rounded />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
