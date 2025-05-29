import axios from 'axios';

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Obtener categorías
export const getCategories = async () => {
  const res = await publicApi.get('/categories');
  return res.data.filter(cat => cat.visible !== false);
};


// Obtener todos los platos visibles (desde /dishes)
export const getDishes = async () => {
  const res = await publicApi.get('/categories/:categoryId/dishes');
  return res.data.filter(dish => dish.visible !== false);
};
