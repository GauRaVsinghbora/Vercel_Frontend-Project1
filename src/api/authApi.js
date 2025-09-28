import api from './axios.js';

export const login = (credentials) => api.post('/users/login', credentials);
export const signup = (credentials) => api.post('/users/register',credentials);
export const logout = () => api.post('/users/logout');
export const verifyOtp = (credentials) => api.post('/users/register/verify-otp',credentials);
export const resendOtp = (credentials) => api.post('/users/register/resend-otp',credentials);