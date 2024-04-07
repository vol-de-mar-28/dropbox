import axios from 'axios';
// ----------------------------------------------------------------------

const HOST = 'https://api.dropboxapi.com/2';

const axiosInstance = axios.create({
  baseURL: HOST,
  validateStatus: () => true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
);

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('dropboxToken');
  return {
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${token}` },
  };
});

export default axiosInstance;
