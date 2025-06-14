import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import { removeFromCart, updateQuantity } from '@/store/cart/cart.slice';
import { CartUtils } from '@/store/cart/cart.utils';
import Button from '@/components/shared/Button/Button';
import './Cart.scss';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  
  const cartSummary = CartUtils.calculateCartSummary(items);
  const orderId = CartUtils.generateOrderId();

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    dispatch(updateQuantity({ id: itemId, quantity }));
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
            
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>
                  
                  <div className="cart-item-details">
                    <div className="cart-item-info">
                      <h3 className="cart-item-name">{item.product.name}</h3>
                      <p className="cart-item-category">{item.product.category}</p>
                      <div className="cart-item-footer">
                        <span className="cart-item-price">${item.product.price}</span>
                        <span className="cart-item-stock">Stock: {item.product.stock}</span>
                      </div>
                    </div>
                    
                    <div className="cart-item-actions">
                      <button
                        className="cart-item-remove"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                      
                      <div className="cart-item-quantity">
                        <button 
                          className="quantity-btn"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="order-summary-header">
              <h2>Order Summary (#{orderId})</h2>
              <span className="order-date">{new Date().toLocaleDateString()}</span>
            </div>
            
            <div className="order-summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${cartSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>${cartSummary.shipping.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (14%)</span>
                <span>${cartSummary.tax.toFixed(2)}</span>
              </div>
              <div className="summary-row summary-row--total">
                <span>Total</span>
                <span>${cartSummary.total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button variant="primary" size="lg" className="checkout-btn">
              Place the order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;