import React from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { CartService } from '@/store/cart/cart.service';
import { CartUtils } from '@/store/cart/cart.utils';
import Button from '@/components/shared/Button/Button';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import './OrderSummary.scss';
import { useNavigate } from 'react-router-dom';

const OrderSummary: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const summary = CartUtils.calculateCartSummary(items);
  const navigate = useNavigate();

  const handleRemove = (id: string) => {
    dispatch(CartService.removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(CartService.updateQuantity({ id, quantity }));
  };

  return (
    <aside className="order-summary">
      <h2>Order Summary</h2>
      <div>
        {items.length === 0 && <div className="order-summary-empty">Cart is empty</div>}
        {items.map(item => (
          <div key={item.id} className="order-summary-item">
            <img src={item.product.image} alt={item.product.name} width={40} height={40} />
            <div className="order-summary-item-info">
              <div className="order-summary-item-name">{item.product.name}</div>
              <div className="order-summary-item-controls">
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.product.stock}>+</button>
                <button className="order-summary-item-remove" onClick={() => handleRemove(item.id)} title="Remove">🗑️</button>
              </div>
              <div className="order-summary-item-price">${(item.product.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="order-summary-totals">
        <div><span>Subtotal</span><span>${summary.subtotal.toFixed(2)}</span></div>
        <div><span>Shipping</span><span>${summary.shipping.toFixed(2)}</span></div>
        <div><span>Tax</span><span>${summary.tax.toFixed(2)}</span></div>
        <div className="order-summary-total"><b>Total</b><b>${summary.total.toFixed(2)}</b></div>
      </div>
      <Button variant="primary" size="lg" className="checkout-btn" disabled={items.length === 0} onClick={() => navigate('/cart')}>
        Proceed to Checkout
      </Button>
    </aside>
  );
};

export default OrderSummary;
