import axios from 'axios';

export default () => {
  const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : 'https://kidseason.ru/';
  const instance =  axios.create({baseURL});

  instance.interceptors.request.use(function (config) {
    document.getElementById('loader').style.display = 'flex';
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  instance.interceptors.response.use(function (response) {
    document.getElementById('loader').style.display = 'none';
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  return instance;
}