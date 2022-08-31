<template>
  <div>
    <ui-tabs :active="active" :items="tabs" @change="onChange"></ui-tabs>
    <p>Test: {{ $route.name }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          text: 'Test Main',
          url: 'test.main'
        },
        {
          text: 'Test Sub',
          url: 'test-sub.index'
        },
        {
          text: 'Test Sub2',
          url: 'test.sub2'
        },
        {
          text: 'Test Sub3',
          url: 'test.sub3'
        }
      ]
    };
  },
  computed: {
    active() {
      return this.tabs.findIndex(({ url }) => url === this.$route.name);
    }
  },
  methods: {
    onChange(index) {
      const name = this.tabs[index].url;
      console.log(name);
      if (this.$route.name !== name) {
        this.$router.push({
          name
        });
      }
    }
  }
};
</script>
