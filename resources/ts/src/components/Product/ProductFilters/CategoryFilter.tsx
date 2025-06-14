import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = React.memo(({ categories, selected, onChange }) => (
  <div className="category-options">
    {categories.map((category) => (
      <label key={category} className="category-option">
        <input
          type="radio"
          name="category"
          value={category}
          checked={selected === category}
          onChange={() => onChange(category)}
        />
        <span className="category-option__checkmark"></span>
        <span className="category-option__label">{category}</span>
      </label>
    ))}
  </div>
));

export default CategoryFilter;
