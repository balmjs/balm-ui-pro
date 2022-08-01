import { $routerModel } from './model';

const Intro = () => import('@/views/guide/intro');
const Quickstart = () => import('@/views/guide/quickstart');

export default [
  $routerModel.createRoute('intro', 'guide.intro', Intro),
  $routerModel.createRoute('quickstart', 'guide.quickstart', Quickstart)
];
