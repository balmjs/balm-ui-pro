import { useStore } from 'balm-ui';

const store = useStore();

export default (
  data,
  {
    selectOptions,
    checkboxOptions,
    radioOptions,
    chipsOptions,
    switchOptions,
    multiSelectOptions,
    extra
  }
) => {
  console.log('static data', data, extra);

  const { id } = data;

  return [
    {
      if: !!id,
      label: 'ID',
      component: 'ui-textfield',
      key: 'id',
      value: id,
      attrOrProp: {
        attrs: {
          readonly: true
        }
      }
    },
    {
      label: 'Textfield',
      component: 'ui-textfield',
      key: 'a',
      value: ''
    },
    {
      label: 'Autocomplete',
      component: 'ui-autocomplete',
      key: 'b',
      value: ''
    },
    {
      label: 'Editor',
      component: 'ui-editor',
      key: 'c',
      value: ''
    },
    {
      label: 'Select',
      component: 'ui-select',
      key: 'd',
      value: '',
      model: 'demo:select',
      attrOrProp: {
        defaultLabel: 'default',
        options: selectOptions,
        disabled: extra
      }
    },
    {
      show: ({ d }) => d === 2,
      label: 'Checkbox',
      component: 'ui-checkbox-group',
      key: 'e',
      value: [],
      model: 'demo:checkbox',
      attrOrProp: {
        options: checkboxOptions
      }
    },
    {
      label: 'Radio',
      component: 'ui-radio-group',
      key: 'f',
      value: '',
      model: 'demo:radio',
      attrOrProp: {
        options: radioOptions
      }
    },
    {
      label: 'Chips',
      component: 'ui-chips',
      key: 'g',
      value: [],
      model: 'demo:chips',
      attrOrProp: {
        type: 'filter',
        options: chipsOptions
      }
    },
    {
      label: 'Datepicker',
      component: 'ui-datepicker',
      key: 'h',
      value: ''
    },
    {
      label: 'Rangepicker',
      component: 'ui-rangepicker',
      key: 'i',
      value: []
    },
    {
      label: 'Switch',
      component: 'ui-switch-box',
      key: 'j',
      value: 'off',
      model: 'demo:switch',
      attrOrProp: {
        options: switchOptions,
        switchAttrOrProp: {
          trueValue: 'on',
          falseValue: 'off'
        }
      }
    },
    {
      label: 'Slider',
      component: 'ui-slider',
      key: 'k',
      value: 0
    },
    {
      label: 'Multi-select',
      component: 'ui-multi-select',
      model: 'demo:multiSelect',
      components: [
        {
          key: 'l',
          value: '',
          options: multiSelectOptions,
          // () => http.post('/mock/multi-select/options1'),
          // () =>
          //   store.getModel('demo', {}, { apiAction: 'multiSelectOptions1' }),
          attrOrProp: {
            defaultLabel: 'Select1',
            disabled: extra
          }
        },
        {
          key: 'm',
          value: '',
          options: ({ l }) =>
            // http.post('/mock/multi-select/options2', {
            //     id: l
            //   })
            store.getModel(
              'demo',
              { id: l },
              { apiAction: 'multiSelectOptions2' }
            ),
          attrOrProp: {
            defaultLabel: 'Select2',
            disabled: extra
          }
        },
        {
          key: 'n',
          value: '',
          options: async ({ m }) =>
            // await http.post('/mock/multi-select/options3', {
            //     id: m
            //   })
            await store.getModel(
              'demo',
              { id: m },
              { apiAction: 'multiSelectOptions3' }
            ),
          attrOrProp: {
            defaultLabel: 'Select3',
            disabled: extra
          }
        }
      ],
      validator: 'multiSelectRequired',
      multiSelectRequired: {
        validate(_, { l, m, n }) {
          return l || m || n;
        },
        message: '%s is required'
      }
    },
    {
      // debug: true,
      label: 'Component slot',
      component: 'ui-textfield',
      key: 'o',
      value: ''
    },
    {
      // debug: true,
      label: 'Custom component',
      component: 'x-form-item',
      key: 'p',
      value: '',
      modelEvent: 'input',
      event: (a, b, c) => {
        console.log('a', a);
        console.log('b', b);
        console.log('c', c);
        c.test();
      },
      listeners: {
        add: (e) => {
          console.log('e', e);
        }
      }
    },
    {
      label: 'Custom slot',
      slot: 'custom-slot'
    },
    ...(id
      ? [
          {
            label: 'Readonly Item',
            component: 'ui-readonly-item',
            key: 'x',
            value: ({ x }) => x,
            attrOrProp: {
              text: 'ox'
            }
          }
        ]
      : [])
  ];
};
