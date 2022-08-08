import { $routerModel } from './model';

const Intro = () => import('@/views/guide/intro');
const Quickstart = () => import('@/views/guide/quickstart');

export default [
  $routerModel.createRoute('intro', 'intro', Intro, {
    namespace: 'guide'
  }),
  $routerModel.createRoute('quickstart', 'quickstart', Quickstart, {
    namespace: 'guide'
  })
];
