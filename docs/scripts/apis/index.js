import userApis from './user';
import postApis from './post';
import demoApis from './demo';
import { isDev } from '@/config';

export default {
  crud: {
    create: 'add',
    // read: 'get',
    read: {
      list: 'list',
      detail: 'info'
    },
    update: 'edit',
    delete: 'delete'
  },
  // formatApiAction: (modelName, actionName) => `${modelName}-${actionName}`,
  // urlToCamelCase: true,
  apis: [...userApis, ...postApis, ...demoApis],
  debug: isDev
};
