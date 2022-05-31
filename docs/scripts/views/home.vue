<template>
  <div class="page--home">
    <h2>Hello BalmUI Pro</h2>
    <ui-markdown :text="docs"></ui-markdown>
    <ui-snippet :code="code"></ui-snippet>
  </div>
</template>

<script setup>
import docs from '@/docs/demo.md';
import code from '@/snippets/demo.md';
</script>
