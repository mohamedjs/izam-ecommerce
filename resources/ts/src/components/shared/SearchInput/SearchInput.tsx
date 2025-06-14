import React, { useState, useCallback } from 'react';
import { Filter, Search } from 'lucide-react';
import Input from '../Input/Input';
import './SearchInput.scss';
import useWindowSize from '@/hooks/useWindowSize';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onFilter: () => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = React.memo(({
  placeholder = "Search by product name",
  onSearch,
  onFilter,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const {width} = useWindowSize()
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  }, [onSearch]);

  return (
    <div className={`search-input ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        icon={width < 765 && <Filter onClick={onFilter} size={25} />}
      />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;