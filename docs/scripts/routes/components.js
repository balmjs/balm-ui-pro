import { $routerModel, indexView } from '@/pro/model';

const LayoutView = () => import('@/views/components/layout-view');
const FormView = () => import('@/views/components/form-view');
const FormItems = () => import('@/views/components/form-items');
const DetailView = () => import('@/views/components/detail-view');
const TableView = () => import('@/views/components/table-view');
const ReadonlyItem = () => import('@/views/components/readonly-item');
const CheckboxGroup = () => import('@/views/components/checkbox-group');
const RadioGroup = () => import('@/views/components/radio-group');
const SwitchBox = () => import('@/views/components/switch-box');
const MultiSelect = () => import('@/views/components/multi-select');

const modelName = 'components';

export default $routerModel.createRoutes(modelName, {
  indexLeadingSlash: true,
  indexView,
  indexRedirect: {
    name: `${modelName}.form-view`
  },
  detailView: [
    $routerModel.createRoute(
      'layout-view',
      `${modelName}.layout-view`,
      LayoutView
    ),
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
    ),
    $routerModel.createRoute(
      'checkbox-group',
      `${modelName}.checkbox-group`,
      CheckboxGroup
    ),
    $routerModel.createRoute(
      'radio-group',
      `${modelName}.radio-group`,
      RadioGroup
    ),
    $routerModel.createRoute(
      'switch-box',
      `${modelName}.switch-box`,
      SwitchBox
    ),
    $routerModel.createRoute(
      'multi-select',
      `${modelName}.multi-select`,
      MultiSelect
    )
  ]
});
