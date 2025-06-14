import React, { useState, useCallback } from 'react';
import { X, ChevronUp, ChevronDown } from 'lucide-react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setFilters, clearFilters } from '@/store/product/product.slice';
import Button from '@/components/shared/Button/Button';
import './ProductFilters.scss';

interface ProductFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { filters, categories } = useAppSelector((state) => state.product);
  
  const [localFilters, setLocalFilters] = useState({
    category: filters.category || 'All',
    minPrice: filters.minPrice || 0,
    maxPrice: filters.maxPrice || 300,
  });

  const [isPriceExpanded, setIsPriceExpanded] = useState(true);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(true);

  const handleCategoryChange = useCallback((category: string) => {
    setLocalFilters(prev => ({ ...prev, category }));
  }, []);

  const handlePriceChange = useCallback((type: 'min' | 'max', value: number) => {
    setLocalFilters(prev => ({ ...prev, [type === 'min' ? 'minPrice' : 'maxPrice']: value }));
  }, []);

  const handleApplyFilters = useCallback(() => {
    dispatch(setFilters({
      category: localFilters.category === 'All' ? undefined : localFilters.category,
      minPrice: localFilters.minPrice,
      maxPrice: localFilters.maxPrice,
    }));
    onClose();
  }, [dispatch, localFilters, onClose]);

  const handleClearFilters = useCallback(() => {
    const resetFilters = { category: 'All', minPrice: 0, maxPrice: 300 };
    setLocalFilters(resetFilters);
    dispatch(clearFilters());
  }, [dispatch]);

  if (!isOpen) return null;

  return (
    <div className="filters-overlay">
      <div className="filters">
        <div className="filters__header">
          <h2 className="filters__title">Filters</h2>
          <button className="filters__close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="filters__content">
          {/* Price Filter */}
          <div className="filter-section">
            <button 
              className="filter-section__header"
              onClick={() => setIsPriceExpanded(!isPriceExpanded)}
            >
              <span>Price</span>
              {isPriceExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {isPriceExpanded && (
              <div className="filter-section__content">
                <div className="price-range">
                  <div className="price-inputs">
                    <div className="price-input">
                      <label>Min</label>
                      <input
                        type="number"
                        value={localFilters.minPrice}
                        onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                        min="0"
                        max="300"
                      />
                    </div>
                    <div className="price-input">
                      <label>Max</label>
                      <input
                        type="number"
                        value={localFilters.maxPrice}
                        onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                        min="0"
                        max="300"
                      />
                    </div>
                  </div>
                  <div className="price-slider">
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={localFilters.minPrice}
                      onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                      className="slider"
                    />
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={localFilters.maxPrice}
                      onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                      className="slider"
                    />
                  </div>
                  <div className="price-labels">
                    <span>${localFilters.minPrice}</span>
                    <span>${localFilters.maxPrice}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="filter-section">
            <button 
              className="filter-section__header"
              onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}
            >
              <span>Category</span>
              {isCategoryExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {isCategoryExpanded && (
              <div className="filter-section__content">
                <div className="category-options">
                  {categories.map((category) => (
                    <label key={category} className="category-option">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={localFilters.category === category}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <span className="category-option__checkmark"></span>
                      <span className="category-option__label">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="filters__actions">
          <Button variant="primary" onClick={handleApplyFilters}>
            Apply Filter
          </Button>
          <Button variant="ghost" onClick={handleClearFilters}>
            Clear all filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;