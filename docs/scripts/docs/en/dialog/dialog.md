```ts
type ProDialogHandler = (
  actionConfig: ActionButton,
  actionResult: object,
  handleClose: Function
) => void;

interface ProDialogOptions {
  // Basic
  className?: string;
  title?: string;
  content?: string;
  actionConfig?: ActionButton[];
  closable?: boolean;
  maskClosable?: boolean;
  // Custom component
  components?: object;
  component: string;
  modelValueType?: string;
  modelValueDefaults?: any;
  modelValueKeys?: array;
  attrOrProp?: object;
  event?: string;
  // Action handler
  handler?: ProDialogHandler;
  closeOnSave?: boolean;
  refreshOnSave?: boolean;
  refresh?: Function;
}

interface VueInstance {
  $dialog: ProDialogOptions;
}
```

### Options

| Option               | Type             | Default           | Description                                                                                                  | Version |
| -------------------- | ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------ | ------- |
| `id`                 | string           | `null`            | Controls whether the dialog is destroyed.                                                                    | 0.58.0  |
| `className`          | string           | `''`              | The custom class name for the pro dialog.                                                                    |         |
| `title`              | string           | `''`              | The title of the pro dialog.                                                                                 |         |
| `content`            | string           | `''`              | The raw content of the pro dialog.                                                                           |         |
| `actionConfig`       | ActionButton[]   | `[]`              | Action button config, see BalmUI `<ui-button>` props [docs](https://v8.material.balmjs.com/#/general/button) |         |
| `closable`           | boolean          | `false`           | Displays close icon button of the dialog title.                                                              | 0.64.0  |
| `maskClosable`       | boolean          | `false`           | Closes the dialog, when the pro dialog scrim is clicked.                                                     |         |
| `components`         | object           | `{}`              | A hash of components to be made available to the Vue instance.                                               |         |
| `component`          | string           | `''`              | The custom component for the pro dialog.                                                                     |         |
| `modelValueType`     | string           | `'object'`        | The model value type of the custom component.                                                                |         |
| `modelValueDefaults` | any              | `{}`              | The model value of the custom component.                                                                     |         |
| `modelValueKeys`     | array            | `[]`              | The model value filter.                                                                                      |         |
| `attrOrProp`         | object           | `{}`              | The attrs or props of the custom component.                                                                  |         |
| `event`              | string           | `'action'`        | The event name of the custom component.                                                                      |         |
| `handler`            | ProDialogHandler | `() => {}`        | The custom handler of the custom component or pro dialog.                                                    |         |
| `listeners`          | object           | `{}`              | Custom component events.                                                                                     | 0.57.0  |
| `closeOnSave`        | boolean          | `true`            | The pro dialog will auto close after saving model data.                                                      |         |
| `refreshOnSave`      | boolean          | `false`           | The page will auto refresh after saving model data.                                                          |         |
| `refresh`            | function         | `location.reload` | Refreshing current page data.                                                                                |         |

### Use `$dialog` without `.vue` component

```js
import { useDialog } from 'balm-ui-pro';
// OR
// import { useDialog } from 'balm-ui-pro/plugins/dialog';

const $dialog = useDialog();
```

### Develop custom component for `$dialog`

### Required Options

- Custom content
  1. `content`
  2. `actionConfig`
- Custom component
  1. `component`
  2. `attrOrProp.actionConfig`

### Required Events

| Name            | Type                                                     | Description                                          |
| --------------- | -------------------------------------------------------- | ---------------------------------------------------- |
| customEventName | `function(actionConfig: ActionButton, data: ActionData)` | Emits when the custom component action is triggered. |
