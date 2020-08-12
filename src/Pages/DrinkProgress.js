import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getById } from '../services/drinkApi';
import HeaderDetails from '../components/HeaderDetails';
import ShareAndFavorite from '../components/ShareAndFavorite';
import RenderButton from '../components/utils/Button';
//import listIngredientsProgress from '../components/utils/ListIngredientsProgress';
import effectProgress from '../components/utils/effectProgress';
import effectProgress2 from '../components/utils/effectProgress2';
import effectProgress3 from '../components/utils/effectProgress3';
import inProgressStorage, { firstRead } from '../components/utils/inProgressStorage';
import RenderInput from '../components/utils/Input';
import completedStep from '../components/utils/completeStep';

function ListIngredientsProgress(ingredients, setIngredients) {
  return (
    <ul>
      {ingredients.map(({ ingredient, id, measure, isCompleted }) => (
        <li data-testid={`${id}-ingredient-step`}>
          <label
            htmlFor={ingredient}
            style={{ textDecoration: isCompleted ? 'line-through' : '' }}
          >
            <RenderInput
              type="checkbox" id={ingredient} value={ingredient} key={ingredient}
              onClick={() => completedStep(id, setIngredients, ingredients)}
              checked={((isCompleted) && 'checked')}
            />{`${ingredient} - ${measure}`}</label>
        </li>
      ))}
    </ul>
  );
}

function DrinkProgress() {
  const [path, setPath] = useState('');
  const [copied, setCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [readStorage, setReadStorage] = useState(false);

  useEffect(() => {
    effectProgress2(getById, setRecipe, setPath);
  }, []);

  useEffect(() => {
    effectProgress(recipe, setIngredients);
    setReadStorage(true);
  }, [recipe]);

  useEffect(() => {
    effectProgress3(ingredients, setIsDisabled);
    inProgressStorage(ingredients, recipe);
  }, [ingredients]);

  return (
    <div>
      <HeaderDetails recipe={recipe} />
      <ShareAndFavorite
        food={recipe} path={path} copied={copied} setCopied={setCopied} Type="bebida"
      />
      {(readStorage) && firstRead(setIngredients, ingredients, recipe, setReadStorage)}
      <h1>Ingredientes</h1>
      {ListIngredientsProgress(ingredients, setIngredients)}
      <h1>Instruções</h1>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <Link to="/receitas-feitas">
        <RenderButton
          data-testid="finish-recipe-btn" type="button" isDisabled={isDisabled}
        >Finalizar Receita</RenderButton>
      </Link>
    </div>
  );
}

export default DrinkProgress;
