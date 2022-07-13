import UiMarkdown from '@/components/markdown';
import UiSnippet from '@/components/snippet';
import XFormItem from '@/components/x-form-item';

export const BalmUIProConfig = {
  $model: {
    crud: {
      create: 'add',
      update: 'edit'
    }
  }
};

export const customComponents = [UiMarkdown, UiSnippet, XFormItem];
