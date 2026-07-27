import { useParams, Link } from 'react-router-dom';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="container py-4">
      <Link to="/">&larr; Torna al Catalogo</Link>
      <h1 className="mt-3">Dettaglio Prodotto #{id}</h1>
      <p>Dettagli del prodotto selezionato.</p>
    </main>
  );
}
