<template>
  <div class="card">
    <img
      class="image"
      :src="card.imageUrl" />
    <ul>
      <li>Name: {{ card.name }}</li>
      <li>Text: {{ card.text }}</li>
      <li>Set: {{ card.set }}</li>
      <li>Type: {{ card.type }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CardModel from '@/models/CardModel';


@Component
export default class Card extends Vue {
  @Prop() private card!: CardModel;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding-left: 0;
}

.card {
  width: 200px;
  margin: 20px;
}

.image {
  width: 200px;
}
</style>
