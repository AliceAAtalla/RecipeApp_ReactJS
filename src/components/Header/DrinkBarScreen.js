import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipeContext } from '../../context';
import renderInput from '../utils/Input';
import RenderButton from '../utils/Button';
import { getByIngredients, getByFirstLetter, getByName } from '../../services/drinkApi';

const changeData = async (history, setData, data, radio, inputValue) => {
  const text = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  const changedDataNome = await getByName(inputValue)
    .then((drink) => drink)
    .catch((error) => console.log(error));

  if (radio === 'nome') {
    if (!changedDataNome) return alert(text);
    if (changedDataNome.length === 1) {
      return history.push(`/bebidas/${changedDataNome[0].idDrink}`);
    }
    return setData(changedDataNome);
  }

  const changedDataIng = await getByIngredients(inputValue)
    .then((drink) => drink)
    .catch((error) => console.log(error));

  if (radio === 'ingrediente') {
    if (!changedDataIng) return alert(text);
    if (changedDataIng.length === 1) {
      return history.push(`/bebidas/${changedDataIng[0].idDrink}`);
    }
    return setData(changedDataIng);
  }

  const changedDataLetter = await getByFirstLetter(inputValue)
    .then((drink) => drink)
    .catch((error) => console.log(error));

  if (radio === 'primeira-letra') {
    if (inputValue.length > 1) return alert('Sua busca deve conter somente 1 (um) caracter');
    if (!changedDataLetter) return alert(text);
    if (changedDataLetter.length === 1) {
      return history.push(`/bebidas/${changedDataLetter[0].idDrink}`);
    }
    return setData(changedDataLetter);
  }
  return setData(data);
};

const DrinkBarSearch = () => {
  const history = useHistory();
  const { setData, data } = useContext(RecipeContext);
  const [radio, setRadio] = useState('');
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="search-input"
          placeholder="Buscar Receita"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="ingredient-search-radio">
          {renderInput('ingredient-search-radio', 'radio', 'ingrediente', setRadio, '', 'radioBtn')}
          Ingrediente
        </label>
        <label htmlFor="name-search-radio">
          {renderInput('name-search-radio', 'radio', 'nome', setRadio, '', 'radioBtn')}
          Nome
        </label>
        <label htmlFor="first-letter-search-radio">
          {renderInput(
            'first-letter-search-radio',
            'radio',
            'primeira-letra',
            setRadio,
            '',
            'radioBtn'
          )}
          Primeira letra
        </label>
      </div>
      <div>
        <RenderButton
          type="button"
          datatest="exec-search-btn"
          onClick={() => changeData(history, setData, data, radio, inputValue)}
        >
          Buscar
        </RenderButton>
      </div>
    </div>
  );
};

export default DrinkBarSearch;
