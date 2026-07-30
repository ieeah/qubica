# Q-store E-Commerce Challenge

Progetto sviluppato per la tech challenge di Qubica. È un piccolo e-commerce costruito interamente in React e TypeScript, usando Vite come bundler.

Ho cercato di mantenere il focus sull'esperienza utente e sull'accessibilità, evitando di usare framework CSS pesanti o UI library.

## Cosa c'è dentro

- **Catalogo & FakeStoreAPI:** I prodotti vengono fetchati dall'API pubblica, con skeleton loader durante i caricamenti per ridurre i content layout shift.
- **Carrello e Checkout:** Il carrello usa il context ed il localStorage (quando disponibile) per mantenere lo stato in locale, mentre il processo di checkout simula una chiamata di rete.
- **Autenticazione:** C'è un sistema di mock login. Certe aree (come il checkout o il profilo) sono protette tramite un componente wrapper sul router.
- **Styling:** Per lo stile ho usato i CSS modules e variabili globali (`global.css`) per gestire dinamicamente il tema chiaro/scuro. 
- **UX & Animazioni:** Ho inserito alcune View Transitions, ad esempio per il passaggio "fluido" della modale di fine checkout dallo stato di "loading" allo stato di successo.
- **Accessibilità:** Ho cercato di usare il più possibile elementi e tag semantici HTML che garantiscano l'accessibilità di default (dialog, output), non dovendo ricostruirla da zero.
- **Test:** Viene utilizzato Vitest per gli unit test (circa 30) che coprono Context, custom hooks e utility principali.

## Come avviarlo

Il setup è standard. Avendo Node.js installato.

```bash
git clone <repository_url>
cd ./qubica
npm install
npm run dev
```

Il dev server dovrebbe partire su `http://localhost:5173`.

Per far girare i test, lanciare il comando:
```bash
npm test
```

## Note sull'uso dell'AI

Durante lo sviluppo del progetto, mi sono fatto assistere da agenti AI, comandati tramite un mio set di [custom skills](https://gitlab.com/g_ieeah/ai-skills/ai-skills) pensate per aiutarmi nella velocizzazione della gestione del lifecycle del progetto e dei singoli task. Le aree in cui ho sfruttato di più questo strumento, sono:

- Boilerplate iniziale dei componenti.
- Risolvere in modo efficace errori del compilatore TypeScript.
- Scrivere parte del CSS strutturale di base.
- Sveltire la stesura dei file di unit test una volta definita la logica.

L'utilizzo dell'AI mi ha permesso di ridurre i tempi meccanici, "a basso valore", per concentrarmi sulle scelte architetturali e di "disegno", ma soprattutto di concentrarmi sulla cura dei dettagli di accessibilità.
