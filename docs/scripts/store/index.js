import useModelStore from '@/config/model';
import usePageStore from './page';
import useSnippetStore from './snippet';

export default {
  ...useModelStore(),
  ...usePageStore(),
  ...useSnippetStore()
};
