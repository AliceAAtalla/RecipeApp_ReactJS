import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header/Header';
import { getByName, listAllCategories } from '../services/foodApi';
import Loading from '../components/Loading';
import FoodAndDrinkCard from '../components/FoodAndDrinkCard';

const FoodScreen = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    getByName(name).then((data) => {
      setFoods(data);
    });

    listAllCategories().then((data) => {
      setCategories(data);
    });
  }, [name]);

  const changeCategory = (strCategory) => {
    if (name === strCategory) return setName('');
    return setName(strCategory);
  };
  if (!foods) {
    return (
      <div>
        <h2>Nada encontrado</h2>
        <button onClick={() => setName('')}>Voltar</button>
      </div>
    );
  } else if (foods.length === 0) return <Loading />;

  return !foods ? (
    <Loading />
  ) : (
    <div>
      <Header title="Comidas" />
      <button onClick={() => setName('')}>All</button>
      {categories.slice(0, 5).map(({ strCategory }) => (
        <button
          onClick={() => changeCategory(strCategory)}
          data-tesid={`${strCategory}-category-filter`}
          key={strCategory}
        >
          {strCategory}
        </button>
      ))}
      <FoodAndDrinkCard data={foods} info="food" />
      <Footer />
    </div>
  );
};

export default FoodScreen;