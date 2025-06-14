import React from 'react';

interface PriceFilterProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onChange: (type: 'min' | 'max', value: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = React.memo(({ min, max, minValue, maxValue, onChange }) => (
  <div className="price-range">
    <div className="price-inputs">
      <div className="price-input">
        <label>Min</label>
        <input
          type="number"
          value={minValue}
          onChange={(e) => onChange('min', Number(e.target.value))}
          min={min}
          max={max}
        />
      </div>
      <div className="price-input">
        <label>Max</label>
        <input
          type="number"
          value={maxValue}
          onChange={(e) => onChange('max', Number(e.target.value))}
          min={min}
          max={max}
        />
      </div>
    </div>
    <div className="price-slider">
      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        onChange={(e) => onChange('min', Number(e.target.value))}
        className="slider"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxValue}
        onChange={(e) => onChange('max', Number(e.target.value))}
        className="slider"
      />
    </div>
    <div className="price-labels">
      <span>${minValue}</span>
      <span>${maxValue}</span>
    </div>
  </div>
));

export default PriceFilter;
