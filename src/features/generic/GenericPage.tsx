import { useLocation } from 'react-router-dom';

export default function GenericPage() {
  const location = useLocation();
  const pathName = location.pathname.split('/').pop() || 'Pagina';

  return (
    <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <h1 style={{ textTransform: 'capitalize', marginBottom: '1rem' }}>
        {pathName.replace('-', ' ')}
      </h1>
      <p style={{ opacity: 0.8 }}>
        Questa è una pagina bozza temporanea.
        In un'applicazione reale, conterrebbe le informazioni relative a "{pathName}".
      </p>
    </div>
  );
}
