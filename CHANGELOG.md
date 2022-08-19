# [BalmUI Pro](https://legacy.pro.balmjs.com/) ChangeLog

> ⚠️ The current version only supports Vue 2. [Click here](https://github.com/balmjs/balm-ui-pro) for Vue 3.

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
