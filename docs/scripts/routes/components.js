export default [
  {
    path: 'form-view/:id?',
    name: 'components.form-view',
    component: () => import('@/views/components/form-view')
  },
  {
    path: 'detail-view/:id?',
    name: 'components.detail-view',
    component: () => import('@/views/components/detail-view')
  },
  {
    path: 'table-view',
    name: 'components.table-view',
    component: () => import('@/views/components/table-view')
  }
];
