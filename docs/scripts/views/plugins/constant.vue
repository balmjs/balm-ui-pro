<template>
  <docs-page name="constant" without-css demo-count="1">
    <div>
      <p>constant: {{ $constant.use('demo') }}</p>
      <hr />
      <p>list: {{ $constant.useList('demo') }}</p>
      <br />
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
    </div>
    <ui-snippet :code="$store.demos[1]"></ui-snippet>
  </docs-page>
</template>

<script>
export default {};
</script>
