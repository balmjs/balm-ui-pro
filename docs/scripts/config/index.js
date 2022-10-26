import { version } from '../../../package.json';

export const VERSION = version;
export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
export const domain = isProd ? '//legacy.pro.balmjs.com' : '';

// 同步 Sass variables
export const MIN_WIDTH = 1240 + 1;

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

export function setGlobalProps(Vue) {
  Vue.config.productionTip = false;

  Vue.prototype.$domain = domain;

  Vue.prototype.$docs = {
    props: {
      thead: ['Name', 'Type', 'Default', 'Description'],
      tbody: [
        'name',
        'type',
        'default',
        {
          field: 'description',
          raw: true
        }
      ]
    },
    slots: {
      thead: ['Name', 'Description', 'Slot'],
      tbody: ['name', 'description', 'props']
    },
    events: {
      thead: ['Name', 'Type', 'Description'],
      tbody: ['name', 'type', 'description']
    },
    sass: {
      thead: ['Variable', 'Description'],
      tbody: [
        'var',
        {
          field: 'description',
          raw: true
        }
      ]
    }
  };
}
