import { Skeleton } from '@/shared/components/skeleton/Skeleton';
import styles from '@/shared/components/layout/footer/footer.module.css';

export default function FooterSkeleton() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row g-4">
          <div className={`col-12 col-md-4 ${styles.column}`}>
            <Skeleton.Rect w={150} h={24} rounded />
            <div style={{ marginTop: '1rem' }}><Skeleton.Paragraph lines={3} /></div>
          </div>
          <div className={`col-12 col-md-4 ${styles.column}`}>
            <Skeleton.Rect w={150} h={24} rounded />
            <div style={{ marginTop: '1rem' }}><Skeleton.Paragraph lines={3} /></div>
          </div>
          <div className={`col-12 col-md-4 ${styles.columnRight}`}>
             <Skeleton.Rect w={100} h={40} rounded />
             <div style={{ marginTop: '1rem' }}><Skeleton.Paragraph lines={3} /></div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={`container ${styles.bottomContainer}`}>
           <Skeleton.Rect w={250} h={20} rounded />
        </div>
      </div>
    </footer>
  );
}
