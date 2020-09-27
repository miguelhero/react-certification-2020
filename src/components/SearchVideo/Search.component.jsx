import React, { useState } from 'react';
import { Input, InputAdornment } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import youtube from '../../services/youtube';

const SearchVideo = () => {
  const [searchValue, setSearchValue] = useState('');

  const getVideos = async () => {
    const response = await youtube.get('search', {
      params: {
        q: searchValue,
      },
    });
    return response.data.items;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getVideos();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
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
