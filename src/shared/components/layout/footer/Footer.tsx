import styles from './footer.module.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.column}>
            <h3>Navigazione</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">Prodotti</Link></li>
              <li><Link to="/page/sitemap">Sitemap</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Servizio Clienti</h3>
            <ul>
              <li><Link to="/page/contact">Contattaci</Link></li>
              <li><Link to="/page/returns">Resi & Rimborsi</Link></li>
              <li><Link to="/page/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className={styles.columnRight}>
            <div className={styles.logoBox}>
              <img src="/src/assets/Q-store.svg" alt="Q-Store Logo" className={styles.logo} />
            </div>
            <div className={styles.legalInfo}>
              <p>Q-Store Inc.</p>
              <p>Via Roma 123, 00100, Roma</p>
              <p><Link to="/page/privacy">Privacy Policy</Link> | <Link to="/page/terms">Termini e Condizioni</Link></p>
              <p className={styles.copyright}>&copy; {new Date().getFullYear()} Q-Store. Tutti i diritti riservati.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
