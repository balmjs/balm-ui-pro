import pkg from '../../../package.json';

export const VERSION = pkg.version;
export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
export const domain = isProd ? '//pro.material.balmjs.com' : '';

// 同步 Sass variables
export const $MIN_WIDTH = 1240 + 1;

export const API_ENDPOINT = '/api';

export const translations = [
  {
    text: 'English',
    value: 'en'
  },
  {
    text: '中文',
    value: 'zh'
  }
];
