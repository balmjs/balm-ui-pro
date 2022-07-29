<template>
  <div>
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
    object: {{ $constant.useMap('demo') }}
    <br />
    format object:
    {{
      $constant.useMap('demo', {
        key: 'value',
        value: 'label'
      })
    }}
  </div>
</template>

<script>
export default {};
</script>
