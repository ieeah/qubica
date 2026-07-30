import useFakeStore from "./useFakeStore";
import useReactiveRequest from "./useReactiveRequest";

// Shared across all hook instances since e-commerce categories do not change frequently
let cachedCategories: string[] | null = null;
let activeFetchPromise: Promise<[Error | null, string[] | null]> | null = null;

export default function useCategories() {
  const { store } = useFakeStore();

  const [error, categories, isLoading] = useReactiveRequest<string[]>(async () => {
    // Do not pass signal: promise is shared across consumers, unmounting one shouldn't abort it for others.
    if (cachedCategories) {
      return [null, cachedCategories];
    }

    if (!activeFetchPromise) {
      activeFetchPromise = store.categories.getAll();
    }

    const res = await activeFetchPromise;
    const [err, data] = res;
    if (err || !data) {
      activeFetchPromise = null; // Reset active promise on error to allow retrying
    } else {
      cachedCategories = data;
    }

    return res;
  }, [store]);

  return { categories, isLoading, error };
}
