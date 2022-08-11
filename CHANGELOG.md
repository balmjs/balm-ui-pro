# [BalmUI Pro](https://legacy.pro.balmjs.com/) ChangeLog

> ⚠️ The current version only supports Vue 2. [Click here](https://github.com/balmjs/balm-ui-pro) for Vue 3.

## v0.26.0 / 2022-08-11

### BREAKING CHANGES

- `<ui-detail-view>`, `<ui-table-view>`: rename prop `defaultParams` to `defaultModelValue`

## v0.25.3 / 2022-08-10

### Feature

- `<ui-detail-view>`, `<ui-table-view>`: add `defaultParams` prop and `change:x` event

## v0.25.0 / 2022-08-10

### Feature

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
