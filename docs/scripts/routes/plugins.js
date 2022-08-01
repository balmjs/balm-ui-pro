import { $routerModel } from './model';

const Model = () => import('@/views/plugins/model');
const Transform = () => import('@/views/plugins/transform');
const Constant = () => import('@/views/plugins/constant');

export default [
  $routerModel.createRoute('model', 'plugins.model', Model),
  $routerModel.createRoute('transform', 'plugins.transform', Transform),
  $routerModel.createRoute('constant', 'plugins.constant', Constant)
];
