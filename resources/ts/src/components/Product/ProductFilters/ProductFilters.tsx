import React, { useState, useCallback, useMemo, useEffect } from 'react';
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
  const { filters, categories, priceRangeData } = useAppSelector((state) => state.product);

  // Local state for filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>(filters.category ? filters.category.map(String) : []);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice || priceRangeData?.min || 0,
    filters.maxPrice || priceRangeData?.max || 0,
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

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([priceRangeData?.min, priceRangeData.max]);
    dispatch(setProductParams({ filters: {}, page: 1}));
  }

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
            {isPriceExpanded && !!priceRangeData && (
              <div className="filter-section__content">
                <PriceFilter
                  min={priceRangeData?.min || 0}
                  max={priceRangeData?.max || 0}
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
