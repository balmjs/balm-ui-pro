import { useHttp } from '@/plugins/http';
import { useStore } from 'balm-ui';

const http = useHttp();
const store = useStore();

export default ({
  data,
  selectOptions,
  checkboxOptions,
  radioOptions,
  chipsOptions,
  multiSelectOptions1,
  test
}) => {
  console.log('static data', data);
  console.log('test default model options', test);

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
      attrOrProp: {
        defaultLabel: 'default',
        options: selectOptions
      }
    },
    {
      show: ({ d }) => d === 2,
      label: 'Checkbox',
      component: 'ui-checkbox-group',
      key: 'e',
      value: data.e || [],
      attrOrProp: {
        options: checkboxOptions
      }
    },
    {
      label: 'Radio',
      component: 'ui-radio-group',
      key: 'f',
      value: '',
      attrOrProp: {
        options: radioOptions
      }
    },
    {
      label: 'Chips',
      component: 'ui-chips',
      key: 'g',
      value: [8],
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
      attrOrProp: {
        options: [
          {
            label: 'ON',
            value: 'on'
          },
          {
            label: 'OFF',
            value: 'off'
          }
        ],
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
      components: [
        {
          key: 'l',
          value: '',
          options: multiSelectOptions1, // () => http.post('/mock/multi-select/options1'),
          attrOrProp: {
            defaultLabel: 'Select1'
          }
        },
        {
          key: 'm',
          value: '',
          options: ({ l }) =>
            l
              ? // http.post('/mock/multi-select/options2', {
                //     id: l
                //   })
                store.getModel(
                  'demo',
                  { id: l },
                  { apiName: 'multiSelectOptions2' }
                )
              : [],
          attrOrProp: {
            defaultLabel: 'Select2'
          }
        },
        {
          key: 'n',
          value: '',
          options: async ({ m }) =>
            m
              ? // await http.post('/mock/multi-select/options3', {
                //     id: m
                //   })
                await store.getModel(
                  'demo',
                  { id: m },
                  { apiName: 'multiSelectOptions3' }
                )
              : [],
          attrOrProp: {
            defaultLabel: 'Select3'
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
      event: 'input'
    },
    {
      label: 'Custom slot',
      slot: 'custom-slot'
    }
  ];
};
