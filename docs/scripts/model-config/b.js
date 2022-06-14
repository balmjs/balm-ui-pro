export default ({ data }) => {
  console.log('static data', data);
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
      label: 'Input',
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
        'default-label': 'default',
        options: [
          {
            label: 'A',
            value: 1
          },
          {
            label: 'B',
            value: 2
          }
        ]
      }
    },
    {
      show: ({ d }) => d === 2,
      label: 'Checkbox',
      component: 'ui-checkbox-group',
      key: 'e',
      value: data.e || [],
      attrOrProp: {
        options: [
          {
            label: 'C',
            value: 3
          },
          {
            label: 'D',
            value: 4
          }
        ]
      }
    },
    {
      label: 'Radio',
      component: 'ui-radio-group',
      key: 'f',
      value: '',
      attrOrProp: {
        options: [
          {
            label: 'E',
            value: 5
          },
          {
            label: 'F',
            value: 6
          }
        ]
      }
    },
    {
      label: 'Chips',
      component: 'ui-chips',
      key: 'g',
      value: [],
      attrOrProp: {
        type: 'filter',
        options: [
          {
            label: 'G',
            value: 7
          },
          {
            label: 'H',
            value: 8
          },
          {
            label: 'I',
            value: 9
          }
        ]
      }
    },
    {
      label: 'Datepicker',
      component: 'ui-datepicker',
      key: 'h',
      value: '',
      attrOrProp: {
        clear: true
      }
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
      debug: true,
      label: 'Component slot',
      component: 'ui-textfield',
      key: 'l',
      value: ''
    },
    {
      debug: true,
      label: 'Custom component',
      component: 'x-form-item',
      key: 'm',
      value: '',
      event: 'input'
    },
    {
      label: 'Custom slot',
      slot: 'custom-slot'
    }
  ];
};
