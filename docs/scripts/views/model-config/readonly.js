export default (data) => [
  {
    label: 'Label A',
    component: 'ui-readonly-item',
    key: 'a',
    value: data.value
  },
  {
    label: 'Label B',
    component: 'ui-readonly-item',
    key: 'b',
    value: (data) => data.value + '!'
  }
];
