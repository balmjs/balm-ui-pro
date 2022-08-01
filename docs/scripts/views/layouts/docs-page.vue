<template>
  <div
    v-anchor.offset="bottomAffix ? 64 : 128"
    :class="[$tt('body1'), `page--${name}`]"
  >
    <!-- <header :class="[$theme.getTextClassOnLight('primary'), 'hero', type]">
      <slot name="hero"></slot>
    </header> -->

    <ui-toc-affix v-if="name === 'icon'">
      <ui-tab v-anchor:href="'#ui-icons'" class="v-anchor">{{
        $t('page.icons')
      }}</ui-tab>
    </ui-toc-affix>
    <ui-toc-affix v-else-if="name === 'theme'">
      <ui-tab v-anchor:href="'#ui-colors'" class="v-anchor">{{
        $t('page.colors')
      }}</ui-tab>
    </ui-toc-affix>
    <ui-toc-affix
      v-else
      :class="{ 'toc-affix--bottom': bottomAffix }"
      :without-apis="name === 'store'"
      :without-css="withoutCss"
    ></ui-toc-affix>

    <div :class="$tt('body2')">
      <div class="ui-intro">
        <ui-markdown :text="docs.intro"></ui-markdown>
      </div>

      <slot name="before"></slot>

      <h2 v-anchor:id="'ui-usage'">0. {{ $t('page.usage') }}</h2>
      <ui-markdown
        v-if="hasRequirement"
        :text="docs.usage.requirement"
      ></ui-markdown>
      <h3>{{ $t('page.default-usage') }}</h3>
      <ui-markdown :text="docs.usage.default"></ui-markdown>
      <h3>{{ $t('page.individual-usage') }}</h3>
      <ui-markdown :text="docs.usage.individual"></ui-markdown>

      <h2 v-anchor:id="'ui-demo'">1. {{ $t('page.demo') }}</h2>

      <slot>
        <p>Coming Up...</p>
      </slot>

      <h2 v-anchor:id="'ui-apis'">2. {{ $t('page.apis') }}</h2>

      <ui-markdown
        v-for="(apidocs, index) in docs.apis"
        :key="index"
        :class="[
          'component-docs',
          apis[index] ? `component--${apis[index]}` : ''
        ]"
        :text="apidocs"
      ></ui-markdown>

      <template v-if="!withoutCss">
        <h2 v-anchor:id="'ui-sass'">3. {{ $t('page.sass') }}</h2>
        <ui-markdown :text="docs.css"></ui-markdown>
      </template>

      <slot name="after"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocsPage',
  props: {
    type: {
      type: String,
      default: 'component'
    },
    name: {
      type: String,
      required: true
    },
    demoCount: {
      type: [String, Number],
      default: 0
    },
    apis: {
      type: Array,
      default() {
        return [];
      }
    },
    withoutCss: {
      type: Boolean,
      default: false
    },
    bottomAffix: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    docs() {
      return this.initDocs(this.name, {
        apis: this.apis,
        css: !this.withoutCss
      });
    },
    hasRequirement() {
      return ['store', 'typography', 'validator'].includes(this.name);
    }
  },
  created() {
    this.$store.initSnippet(this.name, this.demoCount);
  },
  methods: {
    // NOTE: just one variable in `require` !important
    getDocs(name, key) {
      let result;

      switch (key) {
        case 'css':
          let filename = `docs/${key}/${name}.md`;
          let docs = require(`@/${filename}`);
          result = docs;
          break;
        case 'usage':
          const usageDocs = this.hasRequirement
            ? ['requirement', 'default', 'individual']
            : ['default', 'individual'];

          result = {};
          usageDocs.forEach((usageDoc) => {
            let filename = `docs/${key}/${name}/${usageDoc}.md`;
            let docs = require(`@/${filename}`);
            result[usageDoc] = docs;
          });
          break;
        default:
          if (Array.isArray(key)) {
            // apidocs
            result = key.map((apiDocs) => {
              let filename = `docs/${name}/${apiDocs}.md`;
              let docs = require(`@/${filename}`);
              return docs;
            });
          } else {
            // intro
            let filename = `docs/${name}/${key}.md`;
            let docs = require(`@/${filename}`);
            result = docs;
          }
      }

      return result;
    },
    initDocs(
      name,
      options = {
        apis: [],
        css: false
      }
    ) {
      let result = {
        intro: '',
        usage: '',
        apis: [],
        css: ''
      };

      result.intro = this.getDocs(name, 'intro');

      result.usage = this.getDocs(name, 'usage');

      if (options.apis) {
        let apidocs;
        if (options.apis.length) {
          apidocs = options.apis;
        } else {
          const keyName = this.type === 'directive' ? `v-${name}` : name;
          apidocs = [keyName];
        }
        result.apis = this.getDocs(name, apidocs);
      }

      if (options.css) {
        result.css = this.getDocs(name, 'css');
      }

      return result;
    }
  }
};
</script>
