<template>
  <docs-page name="constant" without-css>
    constant: {{ $constant.use('demo') }}
    <hr />
    list: {{ $constant.useList('demo') }}
    <br />
    format list:
    {{
      $constant.useList('demo', {
        label: 'key',
        value: 'value'
      })
    }}
    <hr />
    map: {{ $constant.useMap('demo') }}
    <br />
    format map:
    {{
      $constant.useMap('demo', {
        key: 'value',
        value: 'label'
      })
    }}
  </docs-page>
</template>

<script>
export default {};
</script>
