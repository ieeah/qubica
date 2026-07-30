import { useState, useCallback, useEffect, useRef } from "react";

/**
 * Manages async request state (isLoading, data, error) for manual execution.
 *
 * @param requestFn Request function. Receives a `RequestInit` with `signal` to support cancellation.
 */
export default function useRequest<T, Args extends any[] = any[]>(
  requestFn: (...args: Args) => Promise<[Error | null, T | null]>
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const requestFnRef = useRef(requestFn);
  useEffect(() => {
    requestFnRef.current = requestFn;
  });

  // Abort previous or unmounted requests to avoid stale state updates
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async (...args: Args) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    const call = requestFnRef.current as (
      ...a: unknown[]
    ) => Promise<[Error | null, T | null]>;
    const [err, res] = await call(...args, { signal: controller.signal });

    if (controller.signal.aborted) {
      return [err, res] as const;
    }

    setError(err);
    setData(res);
    setIsLoading(false);
    return [err, res] as const;
  }, []);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return [error, data, isLoading, execute] as const;
}
