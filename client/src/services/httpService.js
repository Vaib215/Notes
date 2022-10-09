import axios from 'axios';    

axios.interceptors.request.use(
  function (config) {
    config.baseURL = 'http://localhost:3333';
    config.withCredentials = true;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default http;