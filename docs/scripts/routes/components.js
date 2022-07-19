export default [
  {
    path: 'form-view/:id?',
    name: 'components.form-view',
    component: () => import('@/views/components/form-view')
  }
  // {
  //   path: 'detail-view',
  //   name: 'components.detail-view',
  //   component: () => import('@/views/components/detail-view')
  // },
  // {
  //   path: 'list-view',
  //   name: 'components.list-view',
  //   component: () => import('@/views/components/list-view')
  // }
];
