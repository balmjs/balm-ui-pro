# [BalmUI Pro](https://pro.balmjs.com/) ChangeLog

- [`balm-ui-pro@legacy`](https://github.com/balmjs/balm-ui-pro/tree/legacy) for Vue 2

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
