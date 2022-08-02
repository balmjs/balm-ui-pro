```js
const apis = [
  [
    'demo',
    '/demo',
    ['read'],
    {
      crud: {
        read: {
          selectOptions: 'select/options',
          checkboxOptions: 'checkbox/options',
          radioOptions: 'radio/options',
          chipsOptions: 'chips/options',
          multiSelectOptions1: 'multi-select/options1',
          multiSelectOptions2: 'multi-select/options2',
          multiSelectOptions3: 'multi-select/options3'
        }
      }
    }
  ],
  ['user', '/user', ['create', 'read', 'update', 'delete']],
  [
    'post',
    '/post',
    ['read'],
    {
      crud: {
        read: {
          '': 'get',
          index: 'index'
        }
      }
    }
  ]
];

const ModelConfig = {
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

Vue.use(BalmUIPro, {
  $model: ModelConfig
});
```
