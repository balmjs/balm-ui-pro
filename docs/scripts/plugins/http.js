import axios from 'axios';
import { API_ENDPOINT } from '@/config';

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    const { code, data, message } = response.data;
    if (code === 200) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    if (error.response) {
      // saveErrorLog({
      //   name: 'http',
      //   message: 'response error',
      //   error
      // });
    } else if (error.request) {
      // saveErrorLog({
      //   name: 'http',
      //   message: 'request error',
      //   error
      // });
    } else {
      // saveErrorLog({
      //   name: 'http',
      //   message: 'unknown error',
      //   error
      // });
    }

    return Promise.reject(error);
  }
);

const useHttp = () => axios;

export default {
  install(Vue) {
    axios.defaults.baseURL = API_ENDPOINT;

    Vue.prototype.$http = axios;
  }
};
export { useHttp };
