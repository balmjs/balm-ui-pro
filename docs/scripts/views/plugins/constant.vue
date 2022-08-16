<template>
  <docs-page name="constant" without-css demo-count="1">
    <div>
      <p>constant: {{ $constant.use('demo').valueOf() }}</p>
      <hr />
      <p>list: {{ $constant.useList('demo') }}</p>
      <p>
        format list:
        {{
          $constant.useList('demo', {
            label: 'key',
            value: 'value'
          })
        }}
      </p>
      <hr />
      map: {{ $constant.useMap('demo') }}
      <br />
      <p>
        format map:
        {{
          $constant.useMap('demo', {
            key: 'value',
            value: 'label'
          })
        }}
      </p>
      <hr />
      <p>Custom constant: {{ $constant.use(customConstants).toMap() }}</p>
    </div>
    <ui-snippet :code="$store.demos[1]"></ui-snippet>
  </docs-page>
</template>

<script>
export default {
  data() {
    return {
      customConstants: [
        {
          label: 'Custom 1',
          key: 'key1',
          value: 1
        },
        {
          label: 'Custom 2',
          key: 'key2',
          value: 2
        }
      ]
    };
  }
};
</script>
