import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getById } from '../services/drinkApi';
import HeaderDetails from '../components/HeaderDetails';
import RenderInput from '../components/utils/Input';
import ShareAndFavorite from '../components/ShareAndFavorite';

function DrinkProgress() {
  const [path, setPath] = useState('');
  const [copied, setCopied] = useState(false);
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const pathName = window.location.pathname.slice(9);
    const id = pathName.replace(/\D/g, '');
    getById(id).then((data) => setRecipe(data[0]));
    setPath(window.location.href);
  }, []);

  useEffect(() => {
    Object.keys(recipe).map(
      (_, index) => recipe[`strIngredient${index + 1}`]
        && setIngredients((prevState) => [
          ...prevState,
          {
            id: index,
            ingredient: recipe[`strIngredient${index + 1}`],
            measure: recipe[`strMeasure${index + 1}`],
            isCompleted: false,
          },
        ]),
    );
  }, [recipe]);

  const completedStep = (id) => {
    const newIngredients = [...ingredients];
    newIngredients[id].isCompleted = true;
    setIngredients(newIngredients);
  };

  return (
    <div>
      <HeaderDetails recipe={recipe} />
      <ShareAndFavorite food={recipe} path={path} copied={copied} setCopied={setCopied} Type="bebida" />
      <div>
        <div>
          <h1>Ingredientes</h1>
          {ingredients.map(({
            ingredient, id, measure, isCompleted,
          }) => (
            <div>
              <RenderInput
                type="checkbox"
                id={ingredient}
                value={ingredient}
                key={ingredient}
                data-testid={`${id}-ingredient-step`}
                onClick={() => completedStep(id)}
              />
              <label
                htmlFor={ingredient}
                style={{ textDecoration: isCompleted ? 'line-through' : '' }}
              >
                {`${ingredient} - ${measure}`}
              </label>
            </div>
          ))}
        </div>
        <div>
          <h1>Instruções</h1>
          <p data-testid="instructions">{recipe.strInstructions}</p>
        </div>
        <div>
          <Link to="/receitas-feitas">
            <button>Finalizar receita</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DrinkProgress;
