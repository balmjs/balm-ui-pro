import myStore from '@/store';
import UiMarkdown from '@/components/markdown';
import UiSnippet from '@/components/snippet';
import XFormItem from '@/components/x-form-item';

export const BalmUIConfig = {
  $store: myStore
};

export const BalmUIProConfig = {
  UiDetailView: {},
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
    formatApiAction: (modelName, actionName) => `${modelName}-${actionName}`,
    apis: [['college-info', '/admin/service']]
  }
};

export const customComponents = [UiMarkdown, UiSnippet, XFormItem];
