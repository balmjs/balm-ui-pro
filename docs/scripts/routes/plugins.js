export default [
  {
    path: 'model',
    name: 'plugin.model',
    component: () => import('@/views/plugins/model')
  },
  {
    path: 'transform',
    name: 'plugin.transform',
    component: () => import('@/views/plugins/transform')
  }
];
