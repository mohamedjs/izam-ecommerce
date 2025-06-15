import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { CartService } from '@/store/cart/cart.service';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { CartItem } from '@/store/cart/cart.types';

interface CartItemsProps {
  items: CartItem[];
  onRemove: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
}

const CartItems: React.FC<CartItemsProps> = ({ items, onRemove, onUpdateQuantity }) => {
  return (
    <div className="cart-items-list">
      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-image">
            <img src={item.product.image} alt={item.product.name} />
          </div>

          <div className="cart-item-details">
            <div className="cart-item-info">
              <h3 className="cart-item-name">{item.product.name}</h3>
              <p className="cart-item-category">{item.product.category?.name}</p>
              <div className="cart-item-footer">
                <span className="cart-item-price">${item.product.price}</span>
                <span className="cart-item-stock">Stock: {item.product.stock}</span>
              </div>
            </div>

            <div className="cart-item-actions">
              <button
                className="cart-item-remove"
                onClick={() => onRemove(item.id)}
              >
                <Trash2 size={16} />
              </button>

              <div className="cart-item-quantity">
                <button
                  className="quantity-btn"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
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
  );
};

export default CartItems;
