# [BalmUI Pro](https://pro.balmjs.com/) ChangeLog

- [`balm-ui-pro@legacy`](https://github.com/balmjs/balm-ui-pro/tree/legacy) for Vue 2

## v0.28.2 / 2023-10-26

### Bug Fixes

- `<ui-layout-view>`: fix without drawer bug

## v0.28.1 / 2023-09-21

### Chore

- `<ui-list-view>`: update getModelData for invalid response data

## v0.28.0 / 2023-09-18

### Code Refactoring

- `<ui-readonly-item>`: update value function arguments

## v0.27.0 / 2023-09-12

### Feature

- `<ui-list-view>`: update `list-view-title` slot props
- `<ui-detail-view>`: update `detail-view-title` slot props

## v0.26.0 / 2023-04-28

### Feature

- `<ui-form-view>`: new slot `before-form-item`, `form-item` and `after-form-item`
- `<ui-list-view>`: add prop `tableListeners` for custom table event

## v0.25.0 / 2023-04-18

### Code Refactoring

- `<ui-list-view>`: update row and top actions handler

### BREAKING CHANGES

- `<ui-list-view>`: Row and top actions' handler params

## v0.24.0 / 2023-04-11

### Feature

- add `$dialog` plugin

## v0.23.1 / 2023-04-07

### Feature

- `<ui-form-view>`: add `event` and `listeners` for form item config, and `attrOrProp` include `$attrs`

### BREAKING CHANGES

- `<ui-form-view>`: rename the form item config `event` to `modelEvent`

## v0.22.6 / 2023-03-31

### Bug Fixes

- `<ui-list-view>`: fix row and top actions rendering bug

## v0.22.5 / 2023-03-10

### Bug Fixes

- `<ui-form-view>`: fix reset form bug for dynamic form config

## v0.22.4 / 2023-03-10

### Chore

- `<ui-form-view>`: update css for vertical form items

## v0.22.3 / 2023-03-01

### Bug Fixes

- `<ui-list-view>`: fix search form button handler bug for the page reset

## v0.22.2 / 2023-02-02

### Bug Fixes

- `<ui-form-view>`: fix empty component name bug

## v0.22.1 / 2022-12-31

### Bug Fixes

- `<ui-list-view>`: fix `thead` and `tbody` rendering bug

## v0.22.0 / 2022-12-16

### Feature

- `<ui-form-view>`: add prop `components` for local custom form items

## v0.21.0 / 2022-12-13

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

### Chore

- `<ui-form-view>`: optimize form item config for grid cell

### Bug Fixes

- `<ui-switch-box>`: fix switch item label bug

## v0.20.0 / 2022-10-23

### Chore

- clean code for all components' constants

### Feature

- `<ui-layout-view>`: new component for layout
- `<ui-form-view>`: add `actionRendering` prop

### Bug Fixes

- `<ui-form-view>`: fix `modelOptions` init data bug, fix css for from item slider

### Code Refactoring

- `<ui-list-view>`: refactor list view components

### BREAKING CHANGES

- `<ui-table-view>`: deprecated, use `<ui-list-view>` instead

## v0.19.0 / 2022-09-29

### Feature

- `<ui-table-view>`:
  - update `routeName` config of the RowActionButton
  - add `topActionIconFormat` prop

### Chore

- `<ui-table-view>`, `<ui-detail-view>`: optimize initialization and slot data

### Bug Fixes

- `<ui-form-view>`: fix syncFormData bug in conditional rendering

### BREAKING CHANGES

- rename custom form item components' props name
  - `config` -> `proConfig`
  - `formData` -> `proFormData`
  - `formDataSource` -> `proFormDataSource`
  - `componentKey` -> `proComponentKey`

## v0.18.0 / 2022-09-09

### Feature

- `<ui-table-view>`: add `placeholder` prop

## v0.17.0 / 2022-09-09

### Feature

- `<ui-form-view>`: optimize model value and options watching
- `<ui-table-view>`: `topActionConfig` support `if` config for rendering

## v0.16.0 / 2022-09-08

### Feature

- `<ui-form-view>`: optimize model value and config watching, add `dataSource` slot prop
- `<ui-checkbox-group>`: add `allSelected`, `allSelectedLabel`, `selectedAllValue` prop

## v0.15.0 / 2022-08-31

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
  - `$apiModel`
  - `$routerModel`
  - `$transform`
  - `$constant`
