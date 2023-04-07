"use strict";(self.webpackChunkbalm_ui_pro=self.webpackChunkbalm_ui_pro||[]).push([[3764],{3764:function(e,a,i){i.r(a);a.default='<h1 id="quick-start">Quick Start</h1> <h2 id="tips-before-development">Tips before development</h2> <p>BalmUI Pro is a front-end scaffolding. By default, readers have already understood some basic front-end knowledge, and understand awesome CLI and BalmUI. If you are a pure novice, it is recommended to read <a href="https://material.balmjs.com/guide/quickstart">Beginner&#39;s Need to know</a>.</p> <h2 id="requirements">Requirements</h2> <ul> <li>vue 3.x</li> <li>vue-router 4.x</li> <li>balm-ui 10.13.2+</li> </ul> <h2 id="installing">Installing</h2> <pre><code class="language-bash">yarn add balm-ui balm-ui-pro\n# OR\nnpm install --save balm-ui balm-ui-pro\n</code></pre> <h2 id="usage">Usage</h2> <pre><code class="language-scss">@use &#39;balm-ui/dist/balm-ui&#39;;\n@use &#39;balm-ui-pro/dist/balm-ui-pro&#39;;\n</code></pre> <pre><code class="language-js">import { createApp } from &#39;vue&#39;;\nimport App from &#39;@/views/layouts/app&#39;;\nimport BalmUI from &#39;balm-ui&#39;;\nimport BalmUIPro from &#39;balm-ui-pro&#39;;\n\nconst app = createApp(App);\n\napp.use(BalmUI);\napp.use(BalmUIPro);\n\napp.mount(&#39;#app&#39;);\n</code></pre> '}}]);