import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext(['', () => {}]);

const useSearch = () => {
  return useContext(SearchContext);
};

const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={[searchQuery, setSearchQuery]}>
      {children}
    </SearchContext.Provider>
  );
};

export { useSearch };
export default SearchProvider;
