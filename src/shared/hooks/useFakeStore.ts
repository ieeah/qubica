import { useMemo } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import useRequest from './useRequest';


export default function useFakeStore() {

  // Placeholder per il token JWT (in futuro verrà letto da AuthContext)
  const dummyToken = 'dummy_jwt_token_xyz';

  const { request, isLoading } = useRequest(API_BASE_URL);

  const store = useMemo(() => {
    const products = {
      getAll: (options?: RequestInit) => request(API_ENDPOINTS.PRODUCTS, { ...options, method: "GET" }),
      get: (id: number, options?: RequestInit) => request(API_ENDPOINTS.PRODUCT_DETAIL(id), { ...options, method: "GET" }),
      // da arricchire con gli altri metodi via via che si presentano
    }

    const categories = {
      getAll: (options?: RequestInit) => request(API_ENDPOINTS.CATEGORIES, { ...options, method: "GET" }),
      // da arricchire con gli altri metodi via via che si presentano
    }

    const auth = {
      users: (options?: RequestInit) => request(API_ENDPOINTS.USERS, { ...options, method: "GET" }),
      login: (credentials: { username: string; password: string }, options?: RequestInit) =>
        request(API_ENDPOINTS.LOGIN, {
          ...options,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers
          },
          body: JSON.stringify(credentials),
        })
      // da arricchire con gli altri metodi via via che si presentano
    }

    const cart = {
      get: (options?: RequestInit) =>
        request(API_ENDPOINTS.CART, { ...options, method: 'GET' }),
      add: (payload: unknown, options?: RequestInit) =>
        request(API_ENDPOINTS.CART, {
          ...options,
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...options?.headers },
          body: JSON.stringify(payload),
        }),
    }

    return {
      products,
      categories,
      auth,
      cart
    };
  }, [request]);

  return { store, isLoading }
}