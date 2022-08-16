import { $routerModel, indexView } from '@/pro/model';

const FormView = () => import('@/views/components/form-view');
const FormItems = () => import('@/views/components/form-items');
const DetailView = () => import('@/views/components/detail-view');
const TableView = () => import('@/views/components/table-view');
const ReadonlyItem = () => import('@/views/components/readonly-item');

const modelName = 'components';

export default $routerModel.createRoutes(modelName, {
  indexLeadingSlash: true,
  indexView,
  detailView: [
    $routerModel.createRoute(
      'form-view/:id?',
      `${modelName}.form-view`,
      FormView
    ),
    $routerModel.createRoute(
      'form-items',
      `${modelName}.form-items`,
      FormItems
    ),
    $routerModel.createRoute(
      'detail-view/:id?',
      `${modelName}.detail-view`,
      DetailView
    ),
    $routerModel.createRoute(
      'table-view',
      `${modelName}.table-view`,
      TableView
    ),
    $routerModel.createRoute(
      'readonly-item',
      `${modelName}.readonly-item`,
      ReadonlyItem
    )
  ]
});
