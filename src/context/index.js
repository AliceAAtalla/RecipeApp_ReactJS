import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const RecipeContext = createContext();

const ProviderRecipe = ({ children }) => {
  const [data, setData] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const context = {
    data,
    setData,
    ingredients,
    setIngredients,
  };

  return <RecipeContext.Provider value={context}>{children}</RecipeContext.Provider>;
};

ProviderRecipe.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
    .isRequired,
};

export default ProviderRecipe;
