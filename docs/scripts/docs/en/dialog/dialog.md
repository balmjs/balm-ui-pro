```ts
type ProDialogHandler = (
  actionConfig: ActionButton,
  actionResult: object,
  handleClose: Function
) => void;

interface ProDialogOptions {
  // Dialog
  className?: string;
  title?: string;
  actionConfig?: ActionButton[];
  maskClosable?: boolean;
  // Custom component
  components?: object;
  component: string;
  modelValueType?: string;
  modelValueDefaults?: any;
  attrOrProp?: object;
  event?: string;
  // Action handler
  handler?: ProDialogHandler;
  refreshOnSave?: boolean;
  refresh?: Function;
}

interface VueInstance {
  $dialog: ProDialogOptions;
}
```

### Options

| Option               | Type             | Default           | Description                                                                                                  |
| -------------------- | ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `className`          | string           | `''`              | The custom class name for the pro dialog.                                                                    |
| `title`              | string           | `''`              | The title of the pro dialog.                                                                                 |
| `actionConfig`       | ActionButton[]   | `[]`              | Action button config, see BalmUI `<ui-button>` props [docs](https://v8.material.balmjs.com/#/general/button) |
| `maskClosable`       | boolean          | `false`           | Closes the dialog, when the pro dialog scrim is clicked.                                                     |
| `components`         | object           | `{}`              | A hash of components to be made available to the Vue instance.                                               |
| `component`          | string           | required          | The custom component for the pro dialog.                                                                     |
| `modelValueType`     | string           | `'object'`        | The model value type of the custom component.                                                                |
| `modelValueDefaults` | any              | `{}`              | The model value of the custom component.                                                                     |
| `attrOrProp`         | object           | `{}`              | The attrs or props of the custom component.                                                                  |
| `event`              | string           | `'action'`        | The event name of the custom component.                                                                      |
| `handler`            | ProDialogHandler | `() => {}`        | The custom handler of the custom component or pro dialog.                                                    |
| `refreshOnSave`      | boolean          | `false`           | The page will auto refresh after saving model data                                                           |
| `refresh`            | function         | `location.reload` | Refreshing current page data                                                                                 |

### Use `$dialog` without `.vue` component

```js
import { useDialog } from 'balm-ui-pro';
// OR
// import { useDialog } from 'balm-ui-pro/plugins/dialog';

const $dialog = useDialog();
```