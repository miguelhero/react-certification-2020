import React, { useState } from 'react';
import { Input, InputAdornment } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useSearch } from '../../providers/Search';

const SearchVideo = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const [, setSearchQuery] = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchValue);
    history.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        style={{ color: 'white' }}
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </form>
  );
};

export default SearchVideo;
