import axios from 'axios';    

axios.interceptors.request.use(
  function (config) {
    config.baseURL = 'https://notes-server-xkt1.onrender.com/';
    // set headers
    config.headers = {
      'token': localStorage.getItem('token'),
      ...config.headers,
    };
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