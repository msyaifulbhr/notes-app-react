
import React from 'react';
import PropTypes from 'prop-types';

function SearchBar({ keyword, keywordChange, placeholder }) {
  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder={placeholder}
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SearchBar;
