import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const navigate = useNavigate()

const apiClient = axios.create({
  baseURL: 'https://api.homologation.cliqdrive.com.br/auth/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json;version=v1_web',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      navigate('/')
    }
    return Promise.reject(error);
  }
);

export default apiClient;
