import { $routerModel, indexView } from '@/pro/model';

const Test = () => import('@/views/test');

const modelName = 'test';
const meta = {
  noLayout: true
};

export default $routerModel.createRoutes(modelName, {
  indexLeadingSlash: true,
  indexView,
  indexRedirect: {
    name: `${modelName}.main`
  },
  detailView: [
    $routerModel.createRoute('test-main', `${modelName}.main`, Test, {
      meta
    }),
    $routerModel.createRoutes('test-sub', {
      indexView,
      indexRedirect: {
        name: `${modelName}.sub1`
      },
      detailView: [
        $routerModel.createRoute('test-sub1', `${modelName}.sub1`, Test),
        $routerModel.createRoute('test-sub2', `${modelName}.sub2`, Test),
        $routerModel.createRoute('test-sub3', `${modelName}.sub3`, Test)
      ]
    })
  ]
});
