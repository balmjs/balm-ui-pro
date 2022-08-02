import { $routerModel } from './model';

const FormView = () => import('@/views/components/form-view');
const FormItems = () => import('@/views/components/form-items');
const DetailView = () => import('@/views/components/detail-view');
const TableView = () => import('@/views/components/table-view');

export default [
  $routerModel.createRoute('form-view/:id?', 'components.form-view', FormView),
  $routerModel.createRoute('form-items', 'components.form-items', FormItems),
  $routerModel.createRoute(
    'detail-view/:id?',
    'components.detail-view',
    DetailView
  ),
  $routerModel.createRoute('table-view', 'components.table-view', TableView)
];
