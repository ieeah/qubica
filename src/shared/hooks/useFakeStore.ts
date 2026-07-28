import { useMemo } from 'react';


import useRequest from '@/shared/hooks/useRequest';
import { useAuthContext } from '@/shared/context/AuthContext';
import { API_BASE_URL, API_ENDPOINTS } from '@/shared/config/api';

import type { Cart } from '@/shared/types/fakestore/cart';

export default function useFakeStore() {

  // Placeholder per il token JWT (in futuro verrà letto da AuthContext)

  const { token } = useAuthContext();

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
        request(API_ENDPOINTS.CART, {
          ...options,
          method: 'GET',
          headers: {
            ...options?.headers,
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        }),
      add: (payload: Cart, options?: RequestInit) =>
        request(API_ENDPOINTS.CART, {
          ...options,
          method: 'POST',
          headers: {
            ...options?.headers,
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify(payload),
        }),
      update: (payload: Cart, options?: RequestInit) =>
        request(API_ENDPOINTS.CART_DETAIL(payload.id), {
          ...options,
          method: "PUT",
          headers: {
            ...options?.headers,
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        })
    }

    return {
      products,
      categories,
      auth,
      cart
    };
  }, [request, token]);

  return { store, isLoading }
}