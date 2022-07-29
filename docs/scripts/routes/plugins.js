export default [
  {
    path: 'model',
    name: 'plugins.model',
    component: () => import('@/views/plugins/model')
  },
  {
    path: 'transform',
    name: 'plugins.transform',
    component: () => import('@/views/plugins/transform')
  },
  {
    path: 'constant',
    name: 'plugins.constant',
    component: () => import('@/views/plugins/constant')
  }
];
