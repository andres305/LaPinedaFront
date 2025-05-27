// Importa la librería axios para hacer peticiones HTTP
import axios from 'axios';

// Crea una instancia de axios con la URL base definida en las variables de entorno
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para añadir el token de autenticación a cada petición si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Exporta la instancia de axios configurada para usarla en otros archivos
export default api;
