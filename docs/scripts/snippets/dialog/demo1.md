```html
<ui-button raised @click="showDialog">Show dialog</ui-button>
```

```js
export default {
  methods: {
    showDialog() {
      this.$dialog({
        title: 'Custom Dialog',
        component: 'ui-form-view',
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
        handler: (action, data, close) => {
          console.log(action, data, close);
          close();
        }
      });
    }
  }
};
```
