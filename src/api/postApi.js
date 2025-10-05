import api from './axios.js';

export const createPost = (postData) => api.post('/posts/create-post', postData);
export const getAllPosts = () => api.get('/posts/get-all-posts');
export const getPostByUserId = () => api.get(`/posts/get-post-userId`);
