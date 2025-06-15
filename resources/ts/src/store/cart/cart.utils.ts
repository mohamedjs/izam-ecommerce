import Cookie from 'js-cookie';
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

  static getCartFromStateOrStorage(stateItems: CartItem[]): CartItem[] {
    if (stateItems && stateItems.length > 0) return stateItems;
    try {
      const local = Cookie.get('cart');
      if (local) return JSON.parse(local);
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
    }
    return [];
  }
}
