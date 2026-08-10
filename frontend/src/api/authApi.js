import api from './axiosInstance';

export const loginUser = async (credentials) => {
  const response = await api.post('/user/login', credentials);
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await api.post('/user/signup', userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/user/profile');
  return response.data;
};

export const updatePassword = async (passwordData) => {
  const response = await api.put('/user/profile/password', passwordData);
  return response.data;
};