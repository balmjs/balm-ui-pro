<template>
  <docs-page name="transform" without-css demo-count="1">
    <div>
      <p>Original Data: {{ formData }}</p>
      <hr />
      <p>Transform In Data: {{ transformInData }}</p>
      <hr />
      <p>Transform Out Data: {{ transformOutData }}</p>
    </div>
    <ui-snippet :code="$store.demos[1]"></ui-snippet>
  </docs-page>
</template>

<script>
import { useTransform } from 'balm-ui-pro';

const transform = useTransform();

const formData = {
  a: 'a1',
  b: 'b1',
  c: '<p>c1</p>',
  d: 1,
  f: 5,
  g: [7, 8],
  h: '2022-06-11',
  i: ['2022-06-05', '2022-06-15'],
  j: 'off',
  k: 30,
  l: 1,
  m: 11,
  n: 111,
  o: 'o1',
  p: 'p1',
  x: 'xyz'
};

const transformInData = transform
  .in(formData)
  .format('i', ({ i }) => ({
    start: i[0],
    end: i[1]
  }))
  .format(['l', 'm', 'n'], ({ l, m, n }) => ({
    lmn: [l, m, n]
  }))
  .out();

const transformOutData = transform
  .in(transformInData)
  .format(['start', 'end'], ({ start, end }) => ({
    i: [start, end]
  }))
  .format(['lmn'], ({ lmn }) => ({
    l: lmn[0],
    m: lmn[1],
    n: lmn[2]
  }))
  .out();

export default {
  data() {
    return {
      formData,
      transformInData,
      transformOutData
    };
  }
};
</script>
