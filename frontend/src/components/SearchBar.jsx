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
        <img src="/images/searchIcon.svg" alt="Search Icon"/>
        </button>
        </form>
    </div>
  );
};

export default SearchBar;