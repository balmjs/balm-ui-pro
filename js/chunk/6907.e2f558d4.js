"use strict";(self.webpackChunkbalm_ui_pro=self.webpackChunkbalm_ui_pro||[]).push([[6907],{6907:function(n,e,t){t.r(e);e.default='<pre><code class="language-html">&lt;ui-button raised @click=&quot;showDialog&quot;&gt;Show dialog&lt;/ui-button&gt;\n</code></pre> <pre><code class="language-js">export default {\n  methods: {\n    showDialog() {\n      this.$dialog({\n        title: &#39;Custom Dialog&#39;,\n        component: &#39;ui-form-view&#39;,\n        modelValueDefaults: {\n          a: &#39;Hello BalmUI Pro&#39;\n        },\n        attrOrProp: {\n          modelConfig: [\n            {\n              label: &#39;Textfield&#39;,\n              component: &#39;ui-textfield&#39;,\n              key: &#39;a&#39;,\n              value: &#39;&#39;,\n              validator: &#39;required&#39;\n            }\n          ],\n          actionConfig: [\n            {\n              type: &#39;close&#39;,\n              text: &#39;Close&#39;\n            },\n            {\n              type: &#39;submit&#39;,\n              text: &#39;Submit&#39;\n            }\n          ]\n        },\n        handler: (action, data) =&gt; {\n          console.log(action, data);\n        }\n      });\n    }\n  }\n};\n</code></pre> '}}]);