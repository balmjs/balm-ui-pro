"use strict";(self.webpackChunkbalm_ui_pro=self.webpackChunkbalm_ui_pro||[]).push([[1027],{1027:function(n,e,i){i.r(e);e.default='<pre><code class="language-ts">type ModelName = string;\ntype ApiEndpoint = string;\ntype Operation = &#39;create&#39; | &#39;read&#39; | &#39;update&#39; | &#39;delete&#39;;\ntype ApiUrlSuffix = string;\n\ninterface CrudConfig {\n  create?: string | { [key: string]: ApiUrlSuffix };\n  read?: string | { [key: string]: ApiUrlSuffix };\n  update?: string | { [key: string]: ApiUrlSuffix };\n  delete?: string | { [key: string]: ApiUrlSuffix };\n}\n\ninterface ApiConfig {\n  crud?: CrudConfig;\n  formatApiAction?: (frontEndApiName: ModelName, operationName: string) =&gt; string;\n  urlToCamelCase?: boolean;\n}\n\ninterface CustomApiConfig extends ApiConfig {\n  ...CrudConfig\n}\n</code></pre> <pre><code class="language-ts">type ApiModelDefinition = [\n  ModelName,\n  ApiEndpoint,\n  Operation[],\n  CustomApiConfig\n];\n\ninterface GlobalApiConfig extends ApiConfig {\n  apis: ApiModelDefinition[];\n  debug?: true | ModelName;\n}\n</code></pre> '}}]);