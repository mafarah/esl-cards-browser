<template>
  <div class="card">
    <img
      class="image"
      :src="card.imageUrl" />
    <ul>
      <li>
        <span class="property-name">Name: </span>
        <span class="property-value">{{ card.name }}</span>
      </li>
      <li>
        <span class="property-name">Text: </span>
        <span class="property-value">{{ card.text }}</span>
      </li>
      <li>
        <span class="property-name">Set: </span>
        <span class="property-value">{{ card.set }}</span>
      </li>
      <li>
        <span class="property-name">Type: </span>
        <span class="property-value">{{ card.type }}</span>
      </li>
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
@import "@/styles/variables.scss";

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  border-bottom: 1px solid;
  margin-bottom: 5px;
  padding-bottom: 5px;
}

.card {
  margin: 20px;
  width: 250px;
}

.image {
  height: 415px;
  width: 250px;
}

.property-name {
  color: $palette-primary;
  font-weight: bold;
}

@media (min-width: $break-mobile) {
  .card {
    width: 200px;
  }

  .image {
    height: 340px;
    width: 200px;
  }
}
</style>
