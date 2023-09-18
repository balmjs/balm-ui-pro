export default (data) => [
  {
    label: 'Label A',
    component: 'ui-readonly-item',
    key: 'a',
    value: data.a
  },
  {
    label: 'Label B',
    component: 'ui-readonly-item',
    key: 'b',
    value: ({ b }) => b + '!'
  }
];
