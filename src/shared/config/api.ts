export const API_BASE_URL = 'https://fakestoreapi.com';

export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: number) => `/products/${id}`,
  CATEGORIES: '/products/categories',
  CART: '/carts',
  USERS: '/users',
  LOGIN: '/auth/login',
} as const;
