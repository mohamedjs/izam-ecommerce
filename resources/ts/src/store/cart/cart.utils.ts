import { CartItem, CartSummary } from './cart.types';

export class CartUtils {
  static calculateCartSummary(items: CartItem[]): CartSummary {
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 15.00 : 0;
    const tax = subtotal * 0.14; // 14% tax
    const total = subtotal + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      total
    };
  }

  static generateOrderId(): string {
    return Math.floor(Math.random() * 10000).toString();
  }
}