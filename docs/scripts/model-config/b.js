export default ({ data }) => {
  return [
    {
      component: 'ui-textfield',
      label: 'Input',
      key: 'a',
      value: '123'
    },
    {
      component: 'ui-autocomplete',
      label: 'Autocomplete',
      key: 'b',
      value: ''
    },
    {
      component: 'ui-editor',
      label: 'Editor',
      key: 'c',
      value: ''
    },
    {
      component: 'ui-select',
      label: 'Select',
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
      },
      reload: true
    },
    {
      component: 'ui-checkbox-group',
      label: 'Checkbox',
      key: 'e',
      value: [],
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
      },
      showSlots: true
    },
    {
      component: 'ui-radio-group',
      label: 'Radio',
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
      component: 'ui-chips',
      label: 'Chips',
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
      component: 'ui-datepicker',
      label: 'Datepicker',
      key: 'h',
      value: '',
      attrOrProp: {
        clear: true
      }
    },
    // {
    //   component: 'ui-rangepicker',
    //   label: 'Rangepicker',
    //   key: 'i',
    //   value: []
    // },
    {
      component: 'ui-switch-box',
      label: 'Switch',
      key: 'j',
      value: false,
      attrOrProp: {
        options: [
          {
            label: 'On',
            value: true
          },
          {
            label: 'Off',
            value: false
          }
        ]
      }
    },
    {
      component: 'ui-slider',
      label: 'Slider',
      key: 'k',
      value: 0
    }
  ];
};
