import React, { useCallback } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Product } from '@/store/product/product.types';
import Button from '@/components/shared/Button/Button';
import './ProductCard.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { CartService } from '@/store/cart/cart.service';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const cartItem = items.find(item => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = useCallback(() => {
    dispatch(CartService.addToCart({ product, quantity: 1 }));
  }, [dispatch, product]);

  const handleQuantityChange = useCallback((newQuantity: number) => {
    if (cartItem) {
      dispatch(CartService.updateQuantity({ id: cartItem.id, quantity: newQuantity }));
    }
  }, [dispatch, cartItem]);

  const handleIncrement = useCallback(() => {
    handleQuantityChange(quantity + 1);
  }, [handleQuantityChange, quantity]);

  const handleDecrement = useCallback(() => {
    handleQuantityChange(Math.max(0, quantity - 1));
  }, [handleQuantityChange, quantity]);

  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={product.main_image} alt={product.name} />
        {quantity > 0 && (
          <div className="product-card__badge">{quantity}</div>
        )}
      </div>

      <div className="product-card__content">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__category">{product.category.name}</p>
        <div className="product-card__footer">
          <span className="product-card__price">${product.price}</span>
          <span className="product-card__stock">Stock: {product.stock}</span>
        </div>

        {quantity === 0 ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToCart}
            className="product-card__add-btn"
          >
            Add to Cart
          </Button>
        ) : (
          <div className="product-card__quantity">
            <button
              className="quantity-btn"
              onClick={handleDecrement}
              disabled={quantity <= 0}
            >
              <Minus size={16} />
            </button>
            <span className="quantity-value">{quantity}</span>
            <button
              className="quantity-btn"
              onClick={handleIncrement}
              disabled={quantity >= product.stock}
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
