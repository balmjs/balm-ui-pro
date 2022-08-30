import { $routerModel, indexView } from '@/pro/model';

const Intro = () => import('@/views/guide/intro');
const Quickstart = () => import('@/views/guide/quickstart');

const modelName = 'guide';

export default $routerModel.createRoutes(modelName, {
  indexLeadingSlash: true,
  indexView,
  indexRedirect: {
    name: `${modelName}.intro`
  },
  detailView: [
    $routerModel.createRoute('intro', `${modelName}.intro`, Intro),
    $routerModel.createRoute(
      'quickstart',
      `${modelName}.quickstart`,
      Quickstart
    )
  ]
});
