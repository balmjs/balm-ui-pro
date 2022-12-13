<template>
  <docs-page name="dialog" without-css demo-count="1">
    <section class="demo-wrapper">
      <div class="demo">
        <ui-form-view
          :model-config="[
            {
              label: 'Textfield',
              component: 'ui-textfield',
              key: 'a',
              value: '',
              validator: 'required'
            }
          ]"
        ></ui-form-view>
        <ui-button raised @click="showDialog">Show dialog</ui-button>
      </div>
      <ui-snippet :code="$store.demos[1]"></ui-snippet>
    </section>
  </docs-page>
</template>

<script>
export default {
  methods: {
    showDialog() {
      this.$dialog({
        title: 'Custom Dialog',
        component: 'ui-form-view',
        // modelValueType: 'string',
        modelValueDefaults: {
          a: 'Hello BalmUI Pro'
        },
        attrOrProp: {
          modelConfig: [
            {
              label: 'Textfield',
              component: 'ui-textfield',
              key: 'a',
              value: '',
              validator: 'required'
            }
          ],
          actionConfig: [
            {
              type: 'close',
              text: 'Close'
            },
            {
              type: 'submit',
              text: 'Submit'
            }
          ]
        },
        // event: 'input',
        handler: (action, data, close) => {
          console.log(action, data);
          // close();
        }
        // closeOnSave: false
      });
    }
  }
};
</script>
