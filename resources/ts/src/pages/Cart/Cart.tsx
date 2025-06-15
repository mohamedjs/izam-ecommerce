import React from 'react';
import { Link } from 'react-router-dom';
import { CartUtils } from '@/store/cart/cart.utils';
import Button from '@/components/shared/Button/Button';
import './Cart.scss';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { CartService } from '@/store/cart/cart.service';
import CartItems from '@/components/Cart/CartItems';
import CartSummary from '@/components/Cart/CartSummary';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const cartSummary = CartUtils.calculateCartSummary(items);
  const orderId = CartUtils.generateOrderId();

  const handleRemoveItem = (itemId: string) => {
    dispatch(CartService.removeFromCart(itemId));
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    dispatch(CartService.updateQuantity({ id: itemId, quantity }));
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-empty">
            <h1>Your cart is empty</h1>
            <p>Add some products to get started</p>
            <Link to="/products">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Casual</Link>
          <span>/</span>
          <span>Cart</span>
        </nav>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            <h1 className="cart-title">Your cart</h1>
            <CartItems
              items={items}
              onRemove={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </div>

          {/* Order Summary */}
          <CartSummary items={items} summary={cartSummary} orderId={orderId} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
