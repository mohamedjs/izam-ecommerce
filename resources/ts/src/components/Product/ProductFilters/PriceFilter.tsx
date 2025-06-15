import React, { useCallback } from 'react';

interface PriceFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = React.memo(({ min, max, value, onChange }) => {

    const handleMinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(Number(e.target.value), value[1]);
        onChange([newMin, value[1]]);
    }, [onChange, value]);

    const handleMaxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(Number(e.target.value), value[0]);
        onChange([value[0], newMax]);
    }, [onChange, value]);

    const handleSliderMin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(Number(e.target.value), value[1]);
        onChange([newMin, value[1]]);
    }, [onChange, value]);

    const handleSliderMax = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(Number(e.target.value), value[0]);
        onChange([value[0], newMax]);
    }, [onChange, value]);

  return (
    <div className="price-range">
      <div className="price-inputs">
        <div className="price-input">
          <label>Min</label>
          <input
            type="number"
            value={value[0]}
            onChange={handleMinChange}
            min={min}
            max={value[1]}
          />
        </div>
        <div className="price-input">
          <label>Max</label>
          <input
            type="number"
            value={value[1]}
            onChange={handleMaxChange}
            min={value[0]}
            max={max}
          />
        </div>
      </div>
      <div className="price-slider">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={handleSliderMin}
          className="slider"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={handleSliderMax}
          className="slider"
        />
      </div>
      <div className="price-labels">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
});

export default PriceFilter;
