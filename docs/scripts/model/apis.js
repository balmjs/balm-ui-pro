export default [
  [
    'user',
    '/api/user',
    {
      operations: ['create', 'read', 'update', 'delete']
    }
  ],
  [
    'post',
    '/api/post',
    {
      operations: ['read'],
      crud: {
        read: 'get'
      }
    }
  ]
];
