import myStore from '@/store';
import myModel from '@/model';
import myConstants from '@/model/constants';
import { setModelOptionsFn } from '@/model/config';
import UiMarkdown from '@/components/markdown';
import UiSnippet from '@/components/snippet';
import XFormItem from '@/components/x-form-item';

export const BalmUIConfig = {
  $store: myStore
};

export const BalmUIProConfig = {
  $model: myModel,
  $constant: myConstants,
  UiFormView: {
    setModelOptionsFn
  }
};

export const customComponents = [UiMarkdown, UiSnippet, XFormItem];
