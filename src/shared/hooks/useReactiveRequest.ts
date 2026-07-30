import { useEffect } from "react";
import useRequest from "./useRequest";

/**
 * Automatically executes an async request on mount and whenever dependencies change.
 *
 * @param requestFn Request function.
 * @param deps Dependency array to trigger automatic execution.
 */
export default function useReactiveRequest<T, Args extends any[] = any[]>(
  requestFn: (...args: Args) => Promise<[Error | null, T | null]>,
  deps: React.DependencyList = []
) {
  const [error, data, isLoading, execute] = useRequest<T, Args>(requestFn);

  useEffect(() => {
    execute(...([] as unknown as Args));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [error, data, isLoading, execute] as const;
}
