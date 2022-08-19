export default [
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
