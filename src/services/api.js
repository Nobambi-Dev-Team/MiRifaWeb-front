import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor de Peticiones: Adjunta el JWT automáticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor de Respuestas: Manejo global de expiración de token
api.interceptors.response.use((response) => response, (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem('jwtToken');
        
        window.location.href = '/login'; // Redirigir al login si el token expiró o es inválido
    }
    return Promise.reject(error);
});

export default api;