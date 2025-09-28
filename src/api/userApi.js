import api from './axios.js';

export const getUser = () => api.get('/users/get-user');