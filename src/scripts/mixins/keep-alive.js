export default {
  computed: {
    noKeepAlive() {
      const { params, matched } = this.$route;
      return (
        params?.keepAlive === false ||
        matched.some((route) => route.meta?.keepAlive === false)
      );
    }
  },
  activated() {
    if (this.noKeepAlive) {
      this.refreshComponent();
    }
  }
};
