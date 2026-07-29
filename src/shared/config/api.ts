export const API_BASE_URL = 'https://fakestoreapi.com';

const PRODUCTS = "/products";
const CART = "/carts";

export const API_ENDPOINTS = {
  PRODUCTS,
  PRODUCT_DETAIL: (id: number) => `/products/${id}`,
  CATEGORIES: `${PRODUCTS}/categories`,
  CATEGORY_PRODUCTS: (category: string) => `${PRODUCTS}/category/${category}`,
  CART,
  CART_DETAIL: (id: number) => `${CART}/${id}`,
  USERS: '/users',
  LOGIN: '/auth/login',
} as const;
