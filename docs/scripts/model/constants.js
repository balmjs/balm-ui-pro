export const DEMO_DATA = [
  {
    label: 'Label A',
    key: 'a',
    value: 1
  },
  {
    label: 'Label B',
    key: 'b',
    value: 2
  }
];

export const MODEL_NAME_DATA = ['user', 'post', 'demo'].map((key) => ({
  label: key,
  key,
  value: key
}));

export const OPERATION_DATA = ['create', 'read', 'update', 'delete'].map(
  (key) => ({
    label: key,
    key,
    value: key
  })
);

export default {
  demo: DEMO_DATA,
  modelName: MODEL_NAME_DATA,
  operation: OPERATION_DATA
};
