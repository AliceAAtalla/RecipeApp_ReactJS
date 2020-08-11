import effectProgress from './effectProgress';

const effectProgress2 = (getById, setRecipe, setPath) => {
  const pathName = window.location.pathname.slice(9);
  const id = pathName.replace(/\D/g, '');
  getById(id).then((data) => setRecipe(data[0]));
  setPath(window.location.href);
};

export default effectProgress2;
