<template>
  <div :class="[$tt('body1'), 'page--home']">
    <section v-ripple.unbounded class="hero">
      <h1 :class="$tt('headline1')">BalmUI Pro</h1>
    </section>
    <div :class="[$tt('body2'), 'pure-docs']">
      <p :class="$tt('subtitle1')">{{ $t('home.slogan') }}</p>
      <ui-button raised @click="$router.push({ name: 'guide.intro' })">
        {{ $t('home.get-started') }}
      </ui-button>
    </div>
  </div>
</template>

<script>
import docs from '@/docs/demo.md';
import code from '@/snippets/demo.md';

export default {
  data() {
    return {
      docs,
      code
    };
  }
};
</script>
