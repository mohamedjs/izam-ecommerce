import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import Input from '../Input/Input';
import './SearchInput.scss';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = React.memo(({ 
  placeholder = "Search by product name", 
  onSearch, 
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

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
        icon={<Search size={20} />}
      />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;