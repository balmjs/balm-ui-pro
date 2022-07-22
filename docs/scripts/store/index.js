export default {
  methods: {
    async getModelOptions(modelList) {
      console.log('modelList', modelList);
      return {
        test: 'hello world'
      };
    }
  }
};
