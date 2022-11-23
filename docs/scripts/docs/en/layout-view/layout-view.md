```html
<ui-layout-view></ui-layout-view>
```

### Props

| Name                   | Type    | Default | Description                                                                                |
| ---------------------- | ------- | ------- | ------------------------------------------------------------------------------------------ |
| `useTopAppBar`         | boolean | `true`  | Shows top app bar                                                                          |
| `topAppBarAttrOrProp`  | object  | `{}`    | See BalmUI `<ui-top-app-bar>` props [docs](https://material.balmjs.com/layout/top-app-bar) |
| `useDrawer`            | boolean | `true`  | Shows navigation drawer                                                                    |
| `drawerAttrOrProp`     | object  | `{}`    | See BalmUI `<ui-drawer>` props [docs](https://material.balmjs.com/navigation/drawer)       |
| `drawerBelowTopAppBar` | boolean | `false` | Sets drawer below top app bar                                                              |
| `breakpoint`           | number  | `960`   | Sets viewport breakpoint for the modal drawer                                              |

### Slots

| Name                   | Props              | Description                                                                 |
| ---------------------- | ------------------ | --------------------------------------------------------------------------- |
| `top-app-bar-title`    |                    | The title slot holds the application title and can contain HTML.            |
| `top-app-bar-nav-icon` | `navIconClass`     | The nav-icon slot holds the navigation icon and can contain HTML.           |
| `top-app-bar-toolbar`  | `toolbarItemClass` | The toolbar slot holds the top app bar action items and can contain HTML.   |
|                        |
| `before-layout-view`   |                    | Before layout view                                                          |
| `drawer-title`         |                    | The drawer title slot holds the title and subtitle components of the drawer |
| `drawer-content`       |                    | Scrollable content area of the drawer                                       |
| `after-layout-view`    |                    | After layout view                                                           |

### Update layout view for custom menu handler

- `$refs.layoutView.updateLayoutViewport()`
