import { useState, useCallback, useEffect, useRef } from "react";

/**
 * Hook per gestire il ciclo di vita di una funzione che restituisce una Promise (es. chiamate API).
 * 
 * @param requestFn La funzione (factory) che esegue la richiesta.
 * @param deps Array di dipendenze opzionale. Se fornito, la richiesta viene eseguita automaticamente come "Query" al mount o al cambio delle dipendenze. Se omesso, funge da "Mutation" e va eseguita manualmente tramite la funzione `execute`.
 */
export default function useRequest<T, Args extends any[] = any[]>(
  requestFn: (...args: Args) => Promise<[Error | null, T | null]>,
  deps?: React.DependencyList
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Manteniamo la reference più aggiornata alla requestFn per non dover 
  // ricreare execute o rilanciare useEffect se la funzione non è memoizzata.
  const requestFnRef = useRef(requestFn);
  useEffect(() => {
    requestFnRef.current = requestFn;
  });

  const execute = useCallback(async (...args: Args) => {
    setIsLoading(true);
    const [err, res] = await requestFnRef.current(...args);
    setError(err);
    setData(res);
    setIsLoading(false);
    return [err, res] as const;
  }, []);

  const isQuery = Array.isArray(deps);

  useEffect(() => {
    if (isQuery) {
      (async () => {
        await execute(...([] as unknown as Args));
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, isQuery ? deps : []);

  return [error, data, isLoading, execute] as const;
}