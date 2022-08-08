import { $routerModel } from './model';

const FormView = () => import('@/views/components/form-view');
const FormItems = () => import('@/views/components/form-items');
const DetailView = () => import('@/views/components/detail-view');
const TableView = () => import('@/views/components/table-view');

export default [
  $routerModel.createRoute('form-view/:id?', 'form-view', FormView, {
    namespace: 'components'
  }),
  $routerModel.createRoute('form-items', 'form-items', FormItems, {
    namespace: 'components'
  }),
  $routerModel.createRoute('detail-view/:id?', 'detail-view', DetailView, {
    namespace: 'components'
  }),
  $routerModel.createRoute('table-view', 'table-view', TableView, {
    namespace: 'components'
  })
];
