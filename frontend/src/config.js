const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/manese` 
  : 'http://localhost:8080/manese';

export default API_BASE_URL;
