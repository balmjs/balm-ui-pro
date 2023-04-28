"use strict";(self.webpackChunkbalm_ui_pro=self.webpackChunkbalm_ui_pro||[]).push([[5921],{5921:function(t,d,e){e.r(d);d.default='<pre><code class="language-html">&lt;ui-list-view&gt;&lt;/ui-list-view&gt;\n</code></pre> <pre><code class="language-ts">interface ListViewData {\n  title: string;\n  model: string;\n  modelAction: string;\n  modelPath: string;\n  modelOptions: object;\n  modelValueDefaults: object;\n  keyName: string | string[];\n  refreshData: Function;\n  searchForm: object;\n  listData: object;\n  listDataSource: object;\n}\n</code></pre> <ul> <li><p>Search actions</p> <pre><code class="language-js">interface SearchActionData extends ListViewData {\n  ...BalmUIValidationResult\n}\n\ninterface SearchActionButton {\n  text: string;\n  type?: &#39;button&#39; | &#39;submit&#39; | &#39;reset&#39; | string;\n  attrOrProp?: object;\n  handler?: (\n    actionConfig: SearchActionButton,\n    data: SearchActionData\n  ) =&gt; void;\n  submit?: false; // Just for custom `submit` type\n}\n\nconst DefaultSearchActionConfig: SearchActionButton[] = [\n  {\n    type: &#39;reset&#39;,\n    text: &#39;Reset&#39;,\n    attrOrProp: {\n      outlined: true\n    }\n  },\n  {\n    type: &#39;submit&#39;,\n    text: &#39;Search&#39;,\n    attrOrProp: {\n      raised: true\n    }\n  }\n];\n</code></pre> </li> <li><p>Top bar actions</p> <pre><code class="language-ts">interface TopActionData extends ListViewData {\n  resetSelectedRows?: Function;\n}\n\ninterface TopActionButton {\n  if?: boolean | (listViewData: TopActionData) =&gt; boolean;\n  type: &#39;router-link&#39; | string;\n  text: string;\n  icon?: string;\n  routeName?: string | (listViewData: TopActionData) =&gt; string;\n  routeParams?: (listViewData: TopActionData) =&gt; {};\n  attrOrProp?: object;\n  handler?: (listViewData: TopActionData) =&gt; void;\n}\n\ntype GlobalTopActionHandler = (\n  actionConfig: TopActionButton,\n  listViewData: TopActionData\n) =&gt; void;\n</code></pre> </li> <li><p>Table row actions</p> <pre><code class="language-ts">interface RowActionButton {\n  if?: boolean | (rowData: object, listViewData: ListViewData) =&gt; boolean;\n  show?: boolean | (rowData: object, listViewData: ListViewData) =&gt; boolean;\n  type: &#39;router-link&#39; | &#39;no-slot&#39; | string;\n  component?: string; // Just for custom row action component\n  text: string;\n  icon?: string;\n  routeName?: string | (rowData: object, listViewData: ListViewData) =&gt; string;\n  routeParams?: (rowData: object, listViewData: ListViewData) =&gt; {};\n  attrOrProp?: object;\n  href?: string;\n  handler?: (\n    rowData: object,\n    listViewData: ListViewData\n  ) =&gt; void;\n}\n\ntype GlobalRowActionHandler = (\n  actionConfig: RowActionButton,\n  rowData: object,\n  listViewData: ListViewData\n) =&gt; void;\n</code></pre> </li> </ul> <h3 id="props">Props</h3> <table> <thead> <tr> <th>Name</th> <th>Type</th> <th>Default</th> <th>Description</th> <th>Version</th> </tr> </thead> <tbody><tr> <td><code>title</code></td> <td>string</td> <td><code>&#39;&#39;</code></td> <td>Detail view title</td> <td></td> </tr> <tr> <td><code>model</code></td> <td>string</td> <td><em>required</em></td> <td>Model name</td> <td></td> </tr> <tr> <td><code>modelAction</code></td> <td>string</td> <td><code>&#39;&#39;</code></td> <td>Api model action suffix</td> <td></td> </tr> <tr> <td><code>modelConfig</code></td> <td>ModelConfig</td> <td><code>false</code></td> <td>Form model config, see <code>&lt;ui-form-view&gt;</code> props <a href="/components/form-view">docs</a></td> <td></td> </tr> <tr> <td><code>modelPath</code></td> <td>string</td> <td><code>&#39;&#39;</code></td> <td>The file path of model config</td> <td></td> </tr> <tr> <td><code>modelOptions</code></td> <td>object</td> <td><code>{}</code></td> <td>The options of model config</td> <td></td> </tr> <tr> <td><code>modelValueDefaults</code></td> <td>object</td> <td><code>{}</code></td> <td>Sets default value of model data</td> <td></td> </tr> <tr> <td><code>keyName</code></td> <td>string, array</td> <td><code>&#39;id&#39;</code></td> <td>The primary key of model data</td> <td></td> </tr> <tr> <td><code>searchActionConfig</code></td> <td>array</td> <td><code>DefaultSearchActionConfig</code></td> <td>Search form button config, see BalmUI <code>&lt;ui-button&gt;</code> props <a href="https://material.balmjs.com/general/button">docs</a></td> <td></td> </tr> <tr> <td><code>formViewAttrOrProp</code></td> <td>object</td> <td><code>{}</code></td> <td>See <code>&lt;ui-form-view&gt;</code> props <a href="/components/form-view">docs</a></td> <td></td> </tr> <tr> <td><code>noData</code></td> <td>string</td> <td><code>No Data</code></td> <td>No data message</td> <td></td> </tr> <tr> <td><code>thead</code></td> <td>array</td> <td><code>[]</code></td> <td>Table header renderer, see BalmUI <code>&lt;ui-table&gt;</code> props <a href="https://material.balmjs.com/data-display/table">docs</a></td> <td></td> </tr> <tr> <td><code>tbody</code></td> <td>array</td> <td><code>[]</code></td> <td>Table content renderer, see BalmUI <code>&lt;ui-table&gt;</code> props <a href="https://material.balmjs.com/data-display/table">docs</a></td> <td></td> </tr> <tr> <td><code>rowActionConfig</code></td> <td>array</td> <td><code>RowActionButton[]</code></td> <td>Table cell button config, see BalmUI <code>&lt;ui-button&gt;</code> props <a href="https://material.balmjs.com/general/button">docs</a></td> <td></td> </tr> <tr> <td><code>rowActionHandler</code></td> <td>function</td> <td><code>GlobalRowActionHandler</code></td> <td>Table cell button handler</td> <td></td> </tr> <tr> <td><code>rowActionRendering</code></td> <td>function</td> <td><code>() =&gt; true</code></td> <td>Table cell button rendering handler by server-side</td> <td></td> </tr> <tr> <td><code>topActionConfig</code></td> <td>array</td> <td><code>TopActionButton[]</code></td> <td>Table top bar button config, see BalmUI <code>&lt;ui-button&gt;</code> props <a href="https://material.balmjs.com/general/button">docs</a></td> <td></td> </tr> <tr> <td><code>topActionHandler</code></td> <td>function</td> <td><code>GlobalTopActionHandler</code></td> <td>Table top bar button handler</td> <td></td> </tr> <tr> <td><code>topActionRendering</code></td> <td>function</td> <td><code>() =&gt; true</code></td> <td>Table top bar button rendering handler by server-side</td> <td></td> </tr> <tr> <td><code>topActionIconFormat</code></td> <td>object</td> <td><code>{}</code></td> <td>Defines the table top bar button format for the button icons, see BalmUI icons <a href="https://material.balmjs.com/icons">docs</a></td> <td></td> </tr> <tr> <td><code>tableAttrOrProp</code></td> <td>object</td> <td><code>{}</code></td> <td>See BalmUI <code>&lt;ui-table&gt;</code> props <a href="https://material.balmjs.com/data-display/table">docs</a></td> <td></td> </tr> <tr> <td><code>tableDataFormat</code></td> <td>object</td> <td><code>{ data: &#39;data&#39;, total: &#39;total&#39; }</code></td> <td>Defines the table data format for API</td> <td></td> </tr> <tr> <td><code>tableListeners</code></td> <td>object</td> <td><code>{}</code></td> <td>Custom <code>&lt;ui-table&gt;</code> events</td> <td>0.26.0</td> </tr> <tr> <td><code>pageSize</code></td> <td>number</td> <td><code>10</code></td> <td>Default page size</td> <td></td> </tr> <tr> <td><code>paginationAttrOrProp</code></td> <td>object</td> <td><code>{}</code></td> <td>See BalmUI <code>&lt;ui-pagination&gt;</code> props <a href="https://material.balmjs.com/navigation/pagination">docs</a></td> <td></td> </tr> <tr> <td><code>withoutPagination</code></td> <td>boolean</td> <td><code>false</code></td> <td>No pagination</td> <td></td> </tr> <tr> <td><code>getModelConfigFn</code></td> <td>function</td> <td><code>(vm) =&gt; {}</code></td> <td>Loading model config</td> <td></td> </tr> <tr> <td><code>getModelDataFn</code></td> <td>function</td> <td><code>(vm) =&gt; {}</code></td> <td>Loading model data</td> <td></td> </tr> <tr> <td><code>useValidator</code></td> <td>boolean</td> <td><code>false</code></td> <td>Enables auto validator (Just for <code>submit</code> type)</td> <td></td> </tr> <tr> <td><code>placeholder</code></td> <td>string</td> <td><code>&#39;&#39;</code></td> <td>The placeholder before searching model data</td> <td></td> </tr> <tr> <td><code>searchOnReset</code></td> <td>boolean</td> <td><code>false</code></td> <td>The page will auto search data after resetting model data</td> <td></td> </tr> <tr> <td><code>forceRefreshData</code></td> <td>boolean</td> <td><code>false</code></td> <td>Forced refresh data in keep alive</td> <td></td> </tr> </tbody></table> <h3 id="slots">Slots</h3> <table> <thead> <tr> <th>Name</th> <th>Props</th> <th>Description</th> </tr> </thead> <tbody><tr> <td><code>list-view-title</code></td> <td></td> <td>List view title</td> </tr> <tr> <td>custom search form item slots (by form model config)</td> <td><code>config</code>, <code>data</code></td> <td>Custom search form item slots</td> </tr> <tr> <td><code>before-list-view-top-actions</code></td> <td></td> <td>Custom before list top bar actions</td> </tr> <tr> <td><code>list-view-top-actions</code></td> <td>ListViewData</td> <td>Custom list top bar actions</td> </tr> <tr> <td><code>after-list-view-top-actions</code></td> <td></td> <td>Custom after list top bar actions</td> </tr> <tr> <td><code>before-list-view</code></td> <td>ListViewData</td> <td>Before list view</td> </tr> <tr> <td><code>list-view-placeholder</code></td> <td></td> <td>The placeholder before searching model data</td> </tr> <tr> <td><code>list-view-content</code></td> <td>ListViewData</td> <td>Custom list view content</td> </tr> <tr> <td>custom table slots</td> <td>rowData</td> <td>See BalmUI <code>&lt;ui-table&gt;</code> slots <a href="https://material.balmjs.com/data-display/table">docs</a></td> </tr> <tr> <td><code>list-view-row-actions</code></td> <td>rowData</td> <td>Custom table cell actions (When <code>actionConfig = []</code>)</td> </tr> <tr> <td>custom pagination slots</td> <td><code>currentMinRow</code>, <code>currentMaxRow</code></td> <td>See BalmUI <code>&lt;ui-pagination&gt;</code> slots <a href="https://material.balmjs.com/navigation/pagination">docs</a></td> </tr> <tr> <td><code>list-view-empty</code></td> <td></td> <td>Custom no data for list view</td> </tr> <tr> <td><code>after-list-view</code></td> <td>ListViewData</td> <td>After list view</td> </tr> </tbody></table> <h3 id="events">Events</h3> <table> <thead> <tr> <th>Name</th> <th>Type</th> <th>Description</th> </tr> </thead> <tbody><tr> <td><code>update:x</code></td> <td><code>function(key: string, value: string, data: ListViewData)</code></td> <td>Emits when the search form item is changed.</td> </tr> <tr> <td><code>action</code></td> <td><code>function(actionConfig: SearchActionButton, data: SearchActionData)</code></td> <td>Emits when the list view actions is clicked.</td> </tr> </tbody></table> '}}]);