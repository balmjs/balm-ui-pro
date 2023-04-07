"use strict";(self.webpackChunkbalm_ui_pro=self.webpackChunkbalm_ui_pro||[]).push([[5890],{5890:function(t,o,e){e.r(o);o.default='<pre><code class="language-html">&lt;ui-form-view&gt;&lt;/ui-form-view&gt;\n</code></pre> <h3 id="props">Props</h3> <pre><code class="language-ts">type ModelConfig = FormItemConfig[] | (formData: object, formOptions: object) =&gt; FormItemConfig[] | false;\n</code></pre> <table> <thead> <tr> <th>Name</th> <th>Type</th> <th>Default</th> <th>Description</th> </tr> </thead> <tbody><tr> <td><code>components</code></td> <td>object</td> <td><code>{}</code></td> <td>Set local custom form item components</td> </tr> <tr> <td><code>modelConfig</code></td> <td>ModelConfig</td> <td><code>required</code></td> <td>Form model config</td> </tr> <tr> <td><code>modelValue</code></td> <td>object</td> <td><code>{}</code></td> <td>Form model data</td> </tr> <tr> <td><code>modelOptions</code></td> <td>object</td> <td><code>{}</code></td> <td>The extra options of the form model config</td> </tr> <tr> <td><code>useGrid</code></td> <td>boolean</td> <td><code>false</code></td> <td>Enables layout grid for form items</td> </tr> <tr> <td><code>formAttrOrProp</code></td> <td>object</td> <td><code>{}</code></td> <td>See BalmUI <code>&lt;ui-form&gt;</code> props <a href="https://material.balmjs.com/layout/form">docs</a></td> </tr> <tr> <td><code>formItemAttrOrProp</code></td> <td>object</td> <td><code>{}</code></td> <td>Form items&#39; common attrs (e.g. <code>class</code>)</td> </tr> <tr> <td><code>gridAttrOrProp</code></td> <td>object</td> <td><code>{}</code></td> <td>See BalmUI <code>&lt;ui-grid&gt;</code> props <a href="https://material.balmjs.com/layout/grid">docs</a></td> </tr> <tr> <td><code>gridCellAttrOrProp</code></td> <td>object</td> <td><code>{}</code></td> <td>See BalmUI <code>&lt;ui-grid-cell&gt;</code> props <a href="https://material.balmjs.com/layout/grid">docs</a></td> </tr> <tr> <td><code>actionConfig</code></td> <td>ActionButton[]</td> <td><code>[]</code></td> <td>Form button config, see BalmUI <code>&lt;ui-button&gt;</code> props <a href="https://material.balmjs.com/general/button">docs</a></td> </tr> <tr> <td><code>setModelOptionsFn</code></td> <td>function, boolean</td> <td><code>false</code></td> <td>Form model options handler by the <code>model</code> list of form model config</td> </tr> </tbody></table> <ul> <li><p><code>modelConfig: ModelConfig</code></p> <pre><code class="language-ts">interface FormItemConfig {\n  // Show all custom slots names and component event in console\n  debug?: boolean;\n  // Conditional Rendering\n  if?: boolean;\n  show?: boolean | (formData) =&gt; boolean;\n  // Form label\n  label?: string | (formData) =&gt; string;\n  required?: boolean;\n  // Form data config\n  key?: string;\n  value?: string;\n  // Form component config\n  component?: string;\n  components?: FormItemComponentConfig[];\n  attrOrProp?: object;\n  gridCellAttrOrProp?: object;\n  modelEvent?: string; // Defaults: &#39;change&#39;\n  model?: string; // For the options of the source data\n  // Custom component\n  slot?: string;\n  event?: (value, props, ref) =&gt; void; // New in 0.23.0\n  listeners?: { [eventName]: (...args) =&gt; void } // New in 0.23.0\n  // BalmUI validator\n  validator?: string;\n  ...BalmUIValidationRule\n}\n\ninterface FormItemComponentConfig {\n  key?: string;\n  value?: string;\n  attrOrProp?: object;\n  ...customAttrOrProp\n}\n</code></pre> <blockquote> <p>See BalmUI <a href="https://material.balmjs.com/data-input/validator">$validator docs</a> for BalmUIValidationRule details</p> </blockquote> </li> <li><p><code>actionConfig: ActionButton[]</code></p> <pre><code class="language-ts">interface ActionButton {\n  text: string;\n  type?: &#39;button&#39; | &#39;submit&#39; | &#39;reset&#39; | string;\n  attrOrProp?: object;\n  handler?: (\n    actionConfig: ActionButton,\n    validationResult?: BalmUIValidationResult // \u26a0\ufe0f NOTE: Usually used for the `submit` type\n  ) =&gt; void;\n}\n</code></pre> <blockquote> <p>See BalmUI <a href="https://material.balmjs.com/data-input/validator">$validator docs</a> for BalmUIValidationResult details</p> </blockquote> </li> </ul> <h3 id="slots">Slots</h3> <table> <thead> <tr> <th>Name</th> <th>Props</th> <th>Description</th> </tr> </thead> <tbody><tr> <td><code>before-form-view</code></td> <td><code>itemClass</code>, <code>subitemClass</code>, <code>data</code>, <code>dataSource</code></td> <td>Before form items</td> </tr> <tr> <td>custom form item slots (by form model config)</td> <td><code>config</code>, <code>data</code>, <code>dataSource</code></td> <td>Custom form item slots (See all slots names by <code>config.debug</code>)</td> </tr> <tr> <td><code>after-form-view</code></td> <td><code>itemClass</code>, <code>subitemClass</code>, <code>data</code>, <code>dataSource</code></td> <td>After form items</td> </tr> <tr> <td><code>form-view-actions</code></td> <td><code>className</code>, <code>config</code>, <code>data</code>, <code>dataSource</code></td> <td>Custom form buttons</td> </tr> </tbody></table> <ul> <li>Custom form item slots:<ul> <li><code>before-label__[FormItemConfig.component]--[FormItemConfig.key]</code></li> <li><code>after-label__[FormItemConfig.component]--[FormItemConfig.key]</code></li> <li><code>before-item__[FormItemConfig.component]--[FormItemConfig.key]</code></li> <li><code>form-item__[FormItemConfig.component]--[FormItemConfig.key]</code></li> <li><code>after-item__[FormItemConfig.component]--[FormItemConfig.key]</code></li> </ul> </li> </ul> <h3 id="events">Events</h3> <table> <thead> <tr> <th>Name</th> <th>Type</th> <th>Description</th> </tr> </thead> <tbody><tr> <td><code>loaded</code></td> <td><code>function(modelValue: object)</code></td> <td>Emits when the form view config is loaded.</td> </tr> <tr> <td><code>update:modelValue</code></td> <td><code>function(modelValue: object)</code></td> <td>Emits when the form view data is changed.</td> </tr> <tr> <td><code>update:x</code></td> <td><code>function(key: string, value: string)</code></td> <td>Emits when the form item data is changed.</td> </tr> <tr> <td><code>action</code></td> <td><code>function(actionConfig: ActionButton, validationResult?: BalmUIValidationResult)</code></td> <td>Emits when the form view actions is clicked.</td> </tr> </tbody></table> '}}]);