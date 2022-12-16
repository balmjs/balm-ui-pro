<template>
  <div>
    <foobar :components="components" component="Bar" />
  </div>
</template>

<script setup>
import Foobar from './foobar';
import Foo from './foo';
import Bar from './bar';

const components = {
  Foo,
  Bar
};
</script>
