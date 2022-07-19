export default [
  {
    path: 'intro',
    name: 'guide.intro',
    component: () => import('@/views/guide/intro')
  },
  {
    path: 'quickstart',
    name: 'guide.quickstart',
    component: () => import('@/views/guide/quickstart')
  }
];
