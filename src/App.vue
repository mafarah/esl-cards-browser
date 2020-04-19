<template>
  <div id="app">
    <Main />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Main from '@/pages/Main.vue';


@Component({
  components: {
    Main,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

#app {
  font-family: $font-family;
  color: $palette-secondary;
  background: url(/dark-honeycomb.png) repeat 0 0;
  text-shadow: $text-shadow;
}
</style>
