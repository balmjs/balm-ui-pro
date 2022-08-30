<template>
  <div v-anchor.offset="bottomAffix ? 64 : 128" :class="$tt('body1')">
    <!-- <header :class="[$theme.getTextClassOnLight('primary'), 'hero', type]">
      <slot name="hero"></slot>
    </header> -->

    <ui-toc-affix
      v-if="!noUsage"
      :class="{ 'toc-affix--bottom': bottomAffix }"
      :without-css="withoutCss"
    ></ui-toc-affix>

    <div :class="$tt('body2')">
      <div class="ui-intro">
        <ui-markdown :text="docs.intro"></ui-markdown>
      </div>

      <slot name="before"></slot>

      <template v-if="!noUsage">
        <h2 v-anchor:id="'ui-usage'">0. {{ t('page.usage') }}</h2>
        <ui-markdown
          v-if="hasRequirement"
          :text="docs.usage?.requirement"
        ></ui-markdown>
        <h3>{{ t('page.default-usage') }}</h3>
        <ui-markdown :text="docs.usage?.default"></ui-markdown>
        <h3>{{ t('page.individual-usage') }}</h3>
        <ui-markdown :text="docs.usage?.individual"></ui-markdown>

        <h2 v-anchor:id="'ui-demo'">1. {{ t('page.demo') }}</h2>

        <slot>
          <p>Coming Up...</p>
        </slot>

        <h2 v-anchor:id="'ui-apis'">2. {{ t('page.apis') }}</h2>

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
          <h2 v-anchor:id="'ui-sass'">3. {{ t('page.sass') }}</h2>
          <ui-markdown :text="docs.css"></ui-markdown>
        </template>
      </template>

      <slot name="after"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocsPage',
  customOptions: {}
};
</script>

<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useStore } from 'balm-ui';
import useTranslation from '@/utils/t';

const props = defineProps({
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
});

const store = useStore();
const { t } = useTranslation();
let docs = ref({});

const noUsage = computed(() => ['form-items'].includes(props.name));
const hasRequirement = computed(() =>
  ['api-model', 'router-model', 'constant'].includes(props.name)
);

onBeforeMount(async () => {
  docs.value = await initDocs(props);
  store.initSnippet(props.name, props.demoCount);
});

// NOTE: just one variable in `require` !important
async function getDocs(name, key) {
  let result;

  switch (key) {
    case 'css':
      let filename = `${key}/${name}.md`;
      let docs = (await import(`@/docs/${filename}`)).default;
      result = docs;
      break;
    case 'usage':
      const usageDocs = hasRequirement.value
        ? ['requirement', 'default', 'individual']
        : ['default', 'individual'];

      result = {};
      for await (const usageDoc of usageDocs) {
        let filename = `${key}/${name}/${usageDoc}.md`;
        let docs = (await import(`@/docs/${filename}`)).default;
        result[usageDoc] = docs;
      }
      break;
    default:
      if (Array.isArray(key)) {
        // api docs
        result = [];
        for await (const apiDocs of key) {
          let filename = `en/${name}/${apiDocs}.md`;
          let docs = (await import(`@/docs/${filename}`)).default;
          result.push(docs);
        }
      } else {
        // intro
        let filename = `en/${name}/${key}.md`;
        let docs = (await import(`@/docs/${filename}`)).default;
        result = docs;
      }
  }

  return result;
}

async function initDocs({ type, name, apis, withoutCss }) {
  const options = {
    apis: apis || [],
    css: !withoutCss || false
  };

  let result = {
    intro: '',
    usage: {},
    apis: [],
    css: ''
  };

  result.intro = await getDocs(name, 'intro');

  if (!noUsage.value) {
    result.usage = await getDocs(name, 'usage');

    if (options.apis) {
      let apidocs;
      if (options.apis.length) {
        apidocs = options.apis;
      } else {
        const keyName = type === 'directive' ? `v-${name}` : name;
        apidocs = [keyName];
      }
      result.apis = await getDocs(name, apidocs);
    }

    if (options.css) {
      result.css = await getDocs(name, 'css');
    }
  }

  return result;
}
</script>
