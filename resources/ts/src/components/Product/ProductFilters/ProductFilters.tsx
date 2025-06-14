import React, { useState, useCallback, useMemo } from 'react';
import { X, ChevronUp, ChevronDown } from 'lucide-react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setFilters, setProductParams } from '@/store/product/product.slice';
import Button from '@/components/shared/Button/Button';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
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
    dispatch(setProductParams({
      filters: {
        category: localFilters.category === 'All' ? undefined : localFilters.category,
        minPrice: localFilters.minPrice,
        maxPrice: localFilters.maxPrice,
      },
      page: 1
    }));
    onClose();
  }, [dispatch, localFilters, onClose]);

  const handleClearFilters = useCallback(() => {
    const resetFilters = { category: 'All', minPrice: 0, maxPrice: 300 };
    setLocalFilters(resetFilters);
    dispatch(setProductParams({ filters: {}, page: 1 }));
  }, [dispatch]);

  const minPrice = 0;
  const maxPrice = 300;

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
                <PriceFilter
                  min={minPrice}
                  max={maxPrice}
                  minValue={localFilters.minPrice}
                  maxValue={localFilters.maxPrice}
                  onChange={handlePriceChange}
                />
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
                <CategoryFilter
                  categories={categories}
                  selected={localFilters.category}
                  onChange={handleCategoryChange}
                />
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
