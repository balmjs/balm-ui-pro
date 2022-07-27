export default [
  [
    'user',
    '/api/user',
    ['create', 'read', 'update', 'delete']
  ],
  [
    'post',
    '/api/post',
    ['read'],
    {
      crud: {
        read: 'get'
      }
    }
  ]
];
