import { $routerModel } from './model';

const ApiModel = () => import('@/views/plugins/api-model');
const RouterModel = () => import('@/views/plugins/router-model');
const Transform = () => import('@/views/plugins/transform');
const Constant = () => import('@/views/plugins/constant');

export default [
  $routerModel.createRoute('api-model', 'api-model', ApiModel, {
    namespace: 'plugins'
  }),
  $routerModel.createRoute('router-model', 'router-model', RouterModel, {
    namespace: 'plugins'
  }),
  $routerModel.createRoute('transform', 'transform', Transform, {
    namespace: 'plugins'
  }),
  $routerModel.createRoute('constant', 'constant', Constant, {
    namespace: 'plugins'
  })
];
