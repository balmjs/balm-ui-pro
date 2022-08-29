import { $routerModel, indexView } from '@/pro/model';

const ApiModel = () => import('@/views/plugins/api-model');
const RouterModel = () => import('@/views/plugins/router-model');
const Transform = () => import('@/views/plugins/transform');
const Constant = () => import('@/views/plugins/constant');
const Dialog = () => import('@/views/plugins/dialog');

const modelName = 'plugins';

export default $routerModel.createRoutes(modelName, {
  indexLeadingSlash: true,
  indexView,
  indexRedirect: {
    name: `${modelName}.api-model`
  },
  detailView: [
    $routerModel.createRoute('api-model', `${modelName}.api-model`, ApiModel),
    $routerModel.createRoute(
      'router-model',
      `${modelName}.router-model`,
      RouterModel
    ),
    $routerModel.createRoute('transform', `${modelName}.transform`, Transform),
    $routerModel.createRoute('constant', `${modelName}.constant`, Constant),
    $routerModel.createRoute('dialog', `${modelName}.dialog`, Dialog)
  ]
});
