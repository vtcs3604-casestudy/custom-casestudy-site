import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Implement search functionality
  };

  return (
    <div className="search-container">
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Search by keyword, title, description"
            value={query}
            onChange={handleChange}
            style={{ width: '600px' }}
        />
        <button type="submit" className='search-button'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M20.71 19.29l-6.23-6.23A7.93 7.93 0 0 0 16 10c0-4.41-3.59-8-8-8s-8 3.59-8 8 3.59 8 8 8c1.86 0 3.56-.64 4.89-1.71l6.23 6.23a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM4 10c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z"/>
                </svg>
        </button>
        </form>
    </div>
  );
};

export default SearchBar;