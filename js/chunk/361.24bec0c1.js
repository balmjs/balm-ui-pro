"use strict";(self.webpackChunkbalm_ui_pro=self.webpackChunkbalm_ui_pro||[]).push([[361],{361:function(n,e,o){o.r(e);e.default='<ul> <li><p>model config</p> <pre><code class="language-js">[\n  {\n    label: &#39;Radio&#39;,\n    component: &#39;ui-radio-group&#39;,\n    key: &#39;f&#39;,\n    value: &#39;&#39;,\n    attrOrProp: {\n      options: [\n        {\n          label: &#39;E&#39;,\n          value: 5\n        },\n        {\n          label: &#39;F&#39;,\n          value: 6\n        }\n      ]\n    }\n  }\n];\n</code></pre> </li> <li><p>page</p> <pre><code class="language-html">&lt;ui-form-view v-model=&quot;formData&quot; :model-config=&quot;modelConfig&quot;&gt;&lt;/ui-form-view&gt;\n</code></pre> <pre><code class="language-js">import modelConfig from &#39;@/model-config/demo&#39;;\n\nexport default {\n  data() {\n    return {\n      modelConfig,\n      formData: {}\n    };\n  }\n};\n</code></pre> </li> </ul> '}}]);