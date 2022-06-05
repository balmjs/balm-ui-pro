<template>
  <div>
    <div>model: {{ model }}</div>
    <div>apis: {{ apis }}</div>
    <div>apiName: {{ api }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: 'user',
      apis: this.$apiModel.createApis(
        'user',
        '/api/user',
        {
          updateUserStatus: 'status'
        },
        {
          crud: {
            detail: 'info'
          },
          exclude: ['update']
        }
      ),
      apiName: this.$apiModel.getApiName('user', 'list')
    };
  }
};
</script>
