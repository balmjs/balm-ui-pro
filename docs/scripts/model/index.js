import apis from './apis';

export default {
  crud: {
    create: 'add',
    // read: 'get',
    read: {
      list: 'index',
      detail: 'info'
    },
    update: 'edit',
    delete: 'delete'
  },
  // formatApiAction: (modelName, actionName) => `${modelName}-${actionName}`,
  apis
};
