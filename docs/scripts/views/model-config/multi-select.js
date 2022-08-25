import { useStore } from 'balm-ui';

const store = useStore();

export default (_, { multiSelectOptions }) => [
  {
    label: 'Multi-select',
    component: 'ui-multi-select',
    model: 'demo:multiSelect',
    components: [
      {
        key: 'l',
        value: '',
        options: multiSelectOptions,
        attrOrProp: {
          defaultLabel: 'Select1'
        }
      },
      {
        key: 'm',
        value: '',
        options: ({ l }) =>
          store.getModel(
            'demo',
            { id: l },
            { apiAction: 'multiSelectOptions2' }
          ),
        attrOrProp: {
          defaultLabel: 'Select2'
        }
      },
      {
        key: 'n',
        value: '',
        options: async ({ m }) =>
          await store.getModel(
            'demo',
            { id: m },
            { apiAction: 'multiSelectOptions3' }
          ),
        attrOrProp: {
          defaultLabel: 'Select3'
        }
      }
    ]
  }
];
