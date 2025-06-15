import React, { useState, useCallback, useMemo } from 'react';
import { X, ChevronUp, ChevronDown } from 'lucide-react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setProductParams } from '@/store/product/product.slice';
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
  const products = useAppSelector((state) => state.product.products);

  // Memoize min/max price from products
  const [minPrice, maxPrice] = useMemo(() => {
    if (!products.length) return [0, 300];
    const prices = products.map(p => p.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, [products]);

  // Local state for filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>(filters.category ? filters.category.map(String) : []);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice ?? minPrice,
    filters.maxPrice ?? maxPrice,
  ]);
  const [isPriceExpanded, setIsPriceExpanded] = useState(true);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(true);

  // Handlers
  const handleCategoryChange = useCallback((selected: string[]) => {
    setSelectedCategories(selected);
  }, []);

  const handlePriceChange = useCallback((range: [number, number]) => {
    setPriceRange(range);
  }, []);

  const handleApplyFilters = useCallback(() => {
    // Convert selectedCategories to number[] for backend/types
    const categoryIds = selectedCategories.map(id => Number(id));
    dispatch(setProductParams({
      filters: {
        category: categoryIds,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      },
      page: 1,
    }));
    onClose();
  }, [dispatch, selectedCategories, priceRange, onClose]);

  const handleClearFilters = useCallback(() => {
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
    dispatch(setProductParams({ filters: {}, page: 1 }));
  }, [dispatch, minPrice, maxPrice]);

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
              onClick={() => setIsPriceExpanded((prev) => !prev)}
            >
              <span>Price</span>
              {isPriceExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isPriceExpanded && (
              <div className="filter-section__content">
                <PriceFilter
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange}
                  onChange={handlePriceChange}
                />
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="filter-section">
            <button
              className="filter-section__header"
              onClick={() => setIsCategoryExpanded((prev) => !prev)}
            >
              <span>Category</span>
              {isCategoryExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isCategoryExpanded && (
              <div className="filter-section__content">
                <CategoryFilter
                  categories={categories}
                  selected={selectedCategories}
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
