export default {
  props: {
    // For form component
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
