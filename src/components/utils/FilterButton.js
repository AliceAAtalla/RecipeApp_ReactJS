import React from 'react';
import PropTypes from 'prop-types';

function FilterButton({ setFilter }) {
  return (
    <div>
      <button data-testid="filter-by-all-btn" type="button" onClick={() => setFilter('')}>All</button>
      <button data-testid="filter-by-food-btn" type="button" onClick={() => setFilter('comida')}>Food</button>
      <button data-testid="filter-by-drink-btn" type="button" onClick={() => setFilter('bebida')}>Drinks</button>
    </div>
  );
}

FilterButton.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default FilterButton;
