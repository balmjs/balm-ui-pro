import myStore from '@/store';
import { setModelOptionsFn } from '@/config/model';
import UiMarkdown from '@/components/markdown';
import UiSnippet from '@/components/snippet';
import XFormItem from '@/components/x-form-item';

export const BalmUIConfig = {
  $store: myStore
};

export const BalmUIProConfig = {
  UiFormView: {
    setModelOptionsFn
  },
  $model: {
    crud: {
      create: 'add',
      read: 'info',
      update: 'edit'
    },
    read: {
      list: 'list',
      detail: 'detail'
    },
    // formatApiAction: (modelName, actionName) => `${modelName}-${actionName}`,
    apis: [
      [
        'user',
        '/api/user',
        {
          // read: {
          //   list: 'index',
          //   detail: 'info'
          // }
        }
      ]
      // ['college-info', '/api/service']
    ]
  }
};

export const customComponents = [UiMarkdown, UiSnippet, XFormItem];
