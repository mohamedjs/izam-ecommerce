import { Product } from '../product/product.types';
import * as yup from 'yup';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface AddToCartPayload {
  product: Product;
  quantity: number;
}

export interface UpdateQuantityPayload {
  id: string;
  quantity: number;
}

// Validation schemas
export const addToCartSchema = yup.object().shape({
  product: yup.object().required('Product is required'),
  quantity: yup.number()
    .required('Quantity is required')
    .min(1, 'Quantity must be at least 1')
    .max(99, 'Quantity cannot exceed 99')
});

export const updateQuantitySchema = yup.object().shape({
  id: yup.string().required('Item ID is required'),
  quantity: yup.number()
    .required('Quantity is required')
    .min(1, 'Quantity must be at least 1')
    .max(99, 'Quantity cannot exceed 99')
});