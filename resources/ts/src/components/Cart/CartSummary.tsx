import React from 'react';
import Button from '@/components/shared/Button/Button';
import { CartItem } from '@/store/cart/cart.types';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { CartService } from '@/store/cart/cart.service';

interface CartSummaryProps {
  items: CartItem[];
  summary: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  orderId: string;
  loading: boolean;
  handlePlaceOrder: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ items, summary, orderId }) => {
    const dispatch = useAppDispatch();
   const { loading } = useAppSelector(state => state.cart);
   const handlePlaceOrder = () => {
    dispatch(CartService.placeOrder(items));
  };
  return (
    <div className="order-summary cart-summary">
      <div className="order-summary-header">
        <h2>Order Summary (#{orderId})</h2>
        <span className="order-date">{new Date().toLocaleDateString()}</span>
      </div>

      <div className="order-summary-details">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${summary.subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>${summary.shipping.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax (14%)</span>
          <span>${summary.tax.toFixed(2)}</span>
        </div>
        <div className="summary-row summary-row--total">
          <span>Total</span>
          <span>${summary.total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="checkout-btn"
        disabled={items.length === 0 || loading}
        onClick={handlePlaceOrder}
    >
        {loading ? 'Placing Order...' : 'Place the order'}
    </Button>
    </div>
  );
};

export default CartSummary;
