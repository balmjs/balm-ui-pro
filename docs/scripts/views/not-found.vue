<template>
  <div class="page--not-found">
    <section class="hero">
      <h2 :class="$tt('headline2')">404 Not Found</h2>
    </section>
    <div :class="$tt('body2')">
      <p>
        <ui-button @click="$router.replace({ name: 'home' })">Back</ui-button>
      </p>
    </div>
  </div>
</template>
