import apis from './apis';
export * from './config';

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
  apis,
  debug: true
};
