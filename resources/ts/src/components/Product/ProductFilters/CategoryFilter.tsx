import React, { useCallback } from 'react';

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = React.memo(({ categories, selected, onChange }) => {
  const handleCheckbox = useCallback((id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(catId => catId !== id));
    } else {
      onChange([...selected, id]);
    }
  }, [selected, onChange]);

  return (
    <div className="category-options">
      {categories.map((category) => (
        <label key={category.id} className="category-option">
          <input
            type="checkbox"
            name="category"
            value={category.id}
            checked={selected.includes(category.id)}
            onChange={() => handleCheckbox(category.id)}
          />
          <span className="category-option__checkmark"></span>
          <span className="category-option__label">{category.name}</span>
        </label>
      ))}
    </div>
  );
});

export default CategoryFilter;
