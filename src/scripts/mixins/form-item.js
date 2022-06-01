export default {
  props: {
    // For form view
    config: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    key() {
      return this.config.key || 'unknown-key';
    }
  }
};
