<template>
  <div id="cards-container">
    <card
      v-for="card in cards"
      :key="card.name"
      :card="card" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import Card from '@/components/Card.vue';
import CardModel from '@/models/CardModel';


@Component({
  components: {
    Card,
  },
  computed: mapState(['cards']),
})
export default class CardsContainer extends Vue {
  // mapped properties
  cards!: CardModel[];
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#cards-container {
  max-width: $break-desktop;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

</style>
