<template>
  <!-- <div>
    <ui-tabs :active="active" :items="tabs" @change="onChange"></ui-tabs>
    <p>Test: {{ $route.name }}</p>
  </div> -->
  <ui-layout-view drawer-type="modal" :top-app-bar-attr-or-prop="{}">
    <template #drawer-title>
      <ui-drawer-title>Title</ui-drawer-title>
      <ui-drawer-subtitle>Subtitle</ui-drawer-subtitle>
    </template>
    <template #drawer-content>
      <ui-nav>
        <ui-nav-item href="javascript:void(0)" active>Item {{ 0 }}</ui-nav-item>
        <ui-nav-item v-for="i in 12" :key="i" href="javascript:void(0)">
          Item {{ i }}
        </ui-nav-item>
      </ui-nav>
    </template>

    <p>Content</p>
  </ui-layout-view>
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
