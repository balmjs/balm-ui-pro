# [BalmUI Pro](https://legacy.pro.balmjs.com/) ChangeLog

> ⚠️ The current version only supports Vue 2. [Click here](https://github.com/balmjs/balm-ui-pro) for Vue 3.

## v0.54.1 / 2023-04-23

### Bug Fixes

- `<ui-list-view>`: fix rowData bug for row handler

## v0.54.0 / 2023-04-21

### Feature

- `<ui-form-view>`: optimize default slot params for custom form view

## v0.53.0 / 2023-04-20

### Feature

- `<ui-form-item>`: docs released
- `<ui-form-view>`: new slot `before-form-item`, `form-item` and `after-form-item`

## v0.52.0 / 2023-04-17

### Code Refactoring

- `<ui-list-view>`: optimize row and top actions handler

### BREAKING CHANGES

- `<ui-list-view>`:
  - update `change:x` handler params
  - update `routeName` and `routeParams` params for row and top actions' config

## v0.51.2 / 2023-04-14

### Bug Fixes

- `<ui-list-view>`: fix `keyName` bug for row actions
- `$dialog`: fix instance bug

## v0.51.0 / 2023-04-13

### Code Refactoring

- `<ui-list-view>`: update Row and top actions handler

### BREAKING CHANGES

- `<ui-list-view>`: Row and top actions' handler params

## v0.50.1 / 2023-04-07

### Chore

- `<ui-form-view>`: `attrOrProp` include `$attrs`

## v0.50.0 / 2023-04-06

### Feature

- `<ui-form-view>`: add `event` and `listeners` for form item config

### BREAKING CHANGES

- `<ui-form-view>`: rename the form item config `event` to `modelEvent`

## v0.49.6 / 2023-03-31

### Bug Fixes

- `<ui-list-view>`: fix row and top actions rendering bug

## v0.49.5 / 2023-03-10

### Bug Fixes

- `<ui-form-view>`: fix reset form bug for dynamic form config

## v0.49.4 / 2023-03-10

### Chore

- `<ui-form-view>`: update css for vertical form items

## v0.49.3 / 2023-03-01

### Bug Fixes

- `<ui-list-view>`: fix search form button handler bug for the page reset

## v0.49.2 / 2023-02-02

### Bug Fixes

- `<ui-form-view>`: fix empty component name bug

## v0.49.1 / 2022-12-30

### Bug Fixes

- `<ui-list-view>`: fix `thead` and `tbody` rendering bug

## v0.49.0 / 2022-12-20

### Feature

- `$dialog`: add option `content` for custom raw content

## v0.48.0 / 2022-12-20

### Feature

- `<ui-form-view>`: add prop `components` for local custom form items

## v0.47.5 / 2022-12-13

### Bug Fixes

`<ui-list-view>`: fix reset action bug

## v0.47.4 / 2022-12-12

### Chore

- `<ui-form-view>`, `<ui-list-view>`: optimize validationResult for action handler

## v0.47.2 / 2022-12-06

### Bug Fixes

- `<ui-list-view>`, `<ui-detail-view>`: fix title slot bug
- `<ui-switch-box>`: fix switch item label bug

## v0.47.0 / 2022-12-02

### Feature

- `<ui-list-view>`
  - add prop `forceRefreshData`
  - add `column-selection` type for list view top action config
  - new slot `before-list-view-top-actions`, `after-list-view-top-actions`

```json
{
  "type": "column-selection",
  "icon": "view_column",
  "text": "Column",
  "allSelectedLabel": "All"
}
```

## v0.46.0 / 2022-11-22

### Chore

- clean code for all components' constants

## v0.45.0 / 2022-11-17

### Feature

- `<ui-layout-view>`: new component for layout

### Bug Fixes

- `<ui-form-view>`: fix css for from item slider

### Code Refactoring

- `<ui-list-view>`: refactor list view components

### BREAKING CHANGES

- `<ui-table-view>`: deprecated, use `<ui-list-view>` instead

## v0.44.2 / 2022-11-07

### Bug Fixes

- `<ui-form-view>`: fix `modelOptions` init data bug

## v0.44.0 / 2022-11-04

### Feature

- `<ui-form-view>`: add `actionRendering` prop

## v0.43.0 / 2022-11-02

### Feature

- `<ui-table-view>`: add `content` slot

## v0.42.3 / 2022-10-20

### Bug Fixes

- `<ui-table-view>`: fix routeParams bug for top actions

## v0.42.2 / 2022-09-29

### Bug Fixes

- `$apiModel`: fix debug function for some bug

### Chore

- `<ui-table-view>`, `<ui-detail-view>`: optimize modelOptions

## v0.42.0 / 2022-09-27

### BREAKING CHANGES

- rename custom form item components' props name
  - `config` -> `proConfig`
  - `formData` -> `proFormData`
  - `formDataSource` -> `proFormDataSource`
  - `componentKey` -> `proComponentKey`

## v0.41.4 / 2022-09-27

### Bug Fixes

- `<ui-form-view>`: fix syncFormData bug in conditional rendering

## v0.41.0 / 2022-09-23

### Feature

- `<ui-table-view>`: add `topActionIconFormat` prop

## v0.40.0 / 2022-09-14

### Feature

- `<ui-table-view>`: update `routeName` config of the RowActionButton

### Bug Fixes

- `<ui-table-view>`, `<ui-detail-view>`: fix `modelValueDefaults` bug for init

## v0.39.0 / 2022-09-13

### Chore

- `<ui-table-view>`, `<ui-detail-view>`: optimize initialization and slot data

## v0.38.0 / 2022-09-09

### Feature

- `<ui-table-view>`: add `placeholder` prop

## v0.37.0 / 2022-09-09

### Feature

- `<ui-form-view>`: optimize model value and options watching
- `<ui-table-view>`: `topActionConfig` support `if` config for rendering

## v0.36.0 / 2022-09-08

### Feature

- `<ui-form-view>`: optimize model value and config watching, add `dataSource` slot prop

### Bug Fixes

- `<ui-form-view>`: fix model value sync bug

## v0.35.2 / 2022-09-04

### Feature

- `<ui-checkbox-group>`: add `allSelected`, `allSelectedLabel`, `selectedAllValue` prop

### Bug Fixes

- `$routerModel`: fix debug bug

## v0.34.0 / 2022-08-31

### Chore

- `<ui-table-view>`, `<ui-detail-view>`: optimize table view components

## v0.33.1 / 2022-08-29

### Feature

- `$dialog`: add `closeOnSave` and `modelValueKeys` option

### Chore

- optimize debug message

## v0.32.1 / 2022-08-27

### Chore

- `<ui-checkbox-group>`, `<ui-radio-group>`, `<ui-switch-box>`: update _id_ and _for_ naming rule

## v0.32.0 / 2022-08-26

### Feature

- `<ui-table-view>`, `<ui-detail-view>`: add `modelAction` prop
- `$dialog`: add `refreshOnSave` and `refresh` option

### BREAKING CHANGES

- `<ui-table-view>`, `<ui-detail-view>`: rename prop `defaultModelValue` to `modelValueDefaults`

## v0.31.1 / 2020-08-26

### Bug Fixes

- `<ui-table-view>`: fix top actions rendering bug

## v0.31.0 / 2020-08-25

### Feature

- New plugin: `$dialog` for custom components

## v0.30.2 / 2020-08-24

### Feature

- `<ui-table-view>`, `<ui-detail-view>`: support keep alive

### Refactor

- `<ui-multi-select>`: optimize component and some bugfix

## v0.29.0 / 2022-08-19

### Feature

- `<ui-table-view>`, `<ui-detail-view>`: add `modelConfig` prop, optimize interaction

## v0.28.6 / 2022-08-18

### Chore

- `<ui-table-view>`, `<ui-detail-view>`: update default props and css

### Bug Fixes

- `$constant`: fix `use` init undefined bug
- `<ui-form-view>`: fix `modelOptions` watch bug

## v0.28.3 / 2022-08-16

### Feature

- `<ui-form-view>`: update `model-config` function usage
- `$apiModel`: add `debug` for global options
- `$routerModel`: add `debug` and `namespace` for global options, add `indexLeadingSlash`, `indexView`, `listView`, `detailView` options for new api

### Refactor

- `$constant`: update `use` function, add `toList` and `toMap` for custom constants
- `$routerModel`: update `createRoutes` api from `(modelName, components, options) => {}` to `(modelName, options) => {}`

### Bug Fixes

- `<ui-detail-view>`: fix redirect bug
- `$apiModel`: fix definition for default operation

### BREAKING CHANGES

- `<ui-readonly-item>`: remove `value` prop

## v0.27.0 / 2022-08-14

### Refactor

- `<ui-readonly-item>`: update `value` prop for `<ui-form-view>` compatibility, remove other props

## v0.26.3 / 2022-08-11

### Feature

- `<ui-table-view>`: add `searchOnReset` prop, update `change:x` event
- `<ui-readonly-item>`: add `rendering` prop

### Bug Fixes

- `<ui-detail-view>`, `<ui-table-view>`: fix submit bug

### BREAKING CHANGES

- `<ui-detail-view>`, `<ui-table-view>`: rename prop `defaultParams` to `defaultModelValue`

## v0.25.3 / 2022-08-10

### Feature

- `<ui-detail-view>`, `<ui-table-view>`: add `defaultParams` prop and `change:x` event
- optimize `@action` event for `<ui-form-view>`, `<ui-detail-view>`, `<ui-table-view>`

### BREAKING CHANGES

- `<ui-table-view>`: rename props
  - `actionConfig` -> `rowActionConfig`
  - `actionHandler` -> `rowActionHandler`
  - `actionRendering` -> `rowActionRendering`
  - `topbarConfig` -> `topActionConfig`
  - `topbarHandler` -> `topActionHandler`
  - `topbarRendering` -> `topActionRendering`

## v0.24.1 / 2022-08-09

### Chore

- optimize `<ui-table-view>` and `<ui-detail-view>`

## v0.24.0 / 2022-08-08

### Feature

- New plugins: `$apiModel` and `$routerModel`

### BREAKING CHANGES

- splits `$model` plugin to `$apiModel` and `$routerModel`

## v0.23.1 / 2022-08-03

### Bug Fixes

- `<ui-table-view>`: fix table topbar `handler`, add `@reset` event

## v0.23.0 / 2022-08-03

## Chore

- `<ui-form-view`: clean code
- `<ui-detail-view>`, `<ui-table-view>`: optimize message
- `$model`: optimize `urlToCamelCase` options and message

### Bug Fixes

- `<ui-multi-select>`: fix root options bug for dynamic form config

## v0.22.0 / 2022-08-01

- Preview components

  - `<ui-form-view>`
  - `<ui-detail-view>`
  - `<ui-table-view>`
  - `<ui-readonly-item>`
  - `<ui-checkbox-group>`
  - `<ui-radio-group>`
  - `<ui-switch-box>`
  - `<ui-multi-select>`

- Preview plugins
  - `$model`
  - `$transform`
  - `$constant`
