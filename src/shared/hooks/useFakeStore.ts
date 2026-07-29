import { useMemo, useCallback } from 'react';

import { useAuthContext } from '@/shared/context/AuthContext';
import { API_BASE_URL, API_ENDPOINTS } from '@/shared/config/api';
import requestTuple from '@/shared/utils/requestTuple';
import dummyLogger from '@/shared/utils/dummyLogger';

import type { Product } from '@/shared/types/fakestore/product';
import type { Cart } from '@/shared/types/fakestore/cart';
import type { User } from '@/shared/types/fakestore/user';
import type { LoginCredentials, LoginResponse } from '@/shared/types/fakestore/auth';

export default function useFakeStore() {
  const { token } = useAuthContext();

  const request = useCallback(
    async <T = unknown>(url: string, options?: RequestInit): Promise<[Error | null, T | null]> => {
      const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
      dummyLogger.info(`fetched '${fullUrl}', with options: ${JSON.stringify(options ?? {})}`);
      const response = await requestTuple<T>(fetch(fullUrl, options));

      const [error, data] = response;

      if (error != null) {
        dummyLogger.error(`'${fullUrl}' fetch failed with error: ${JSON.stringify(error)}`);
      } else {
        dummyLogger.info(`'${fullUrl}' fetch succeded with data: ${JSON.stringify(data)}`);
      }

      return response;
    },
    []
  );

  const store = useMemo(() => {
    const products = {
      getAll: (options?: RequestInit) => request<Product[]>(API_ENDPOINTS.PRODUCTS, { ...options, method: "GET" }),
      get: (id: number, options?: RequestInit) => request<Product>(API_ENDPOINTS.PRODUCT_DETAIL(id), { ...options, method: "GET" }),
      getFeatured: (_page: string, options?: RequestInit) => {
        // Mock function that ignores the 'page' parameter and fetches product 3
        return request<Product>(API_ENDPOINTS.PRODUCT_DETAIL(3), { ...options, method: "GET" });
      },
      // da arricchire con gli altri metodi via via che si presentano
    }

    const categories = {
      getAll: (options?: RequestInit) => request<string[]>(API_ENDPOINTS.CATEGORIES, { ...options, method: "GET" }),
      getProducts: (category: string, options?: RequestInit) => request<Product[]>(API_ENDPOINTS.CATEGORY_PRODUCTS(category), { ...options, method: "GET" }),
    }

    const auth = {
      users: (options?: RequestInit) => request<User[]>(API_ENDPOINTS.USERS, { ...options, method: "GET" }),
      login: (credentials: LoginCredentials, options?: RequestInit) =>
        request<LoginResponse>(API_ENDPOINTS.LOGIN, {
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
        request<Cart[]>(API_ENDPOINTS.CART, {
          ...options,
          method: 'GET',
          headers: {
            ...options?.headers,
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        }),
      add: (payload: Cart, options?: RequestInit) =>
        request<Cart>(API_ENDPOINTS.CART, {
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
        request<Cart>(API_ENDPOINTS.CART_DETAIL(payload.id), {
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

  return { store }
}