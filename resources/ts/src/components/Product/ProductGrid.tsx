import React from 'react';
import ProductCard from './ProductCard/ProductCard';
import { Product } from '@/store/product/product.types';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  return (
    <div className="products-grid">
      {loading ? (
        <div className="products-loading">
          <div className="loading-spinner" />
          <p>Loading products...</p>
        </div>
      ) : products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="products-empty">
          <p>No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
