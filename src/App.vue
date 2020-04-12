<template>
  <div id="app">
    <input
      v-model="nameToSearch"
      @blur="search" />
    <div id="cards-container">
      <card
        v-for="card in cards"
        :key="card.id"
        :card="card" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import CardModel from '@/models/CardModel';


@Component({
  components: {
    Card,
  },
})
export default class App extends Vue {
  cards: CardModel[];
  nameToSearch = '';

  constructor() {
    super();
    this.cards = [];
    this.getCards();

    window.onscroll = () => {
      const atBottom = document.documentElement.scrollTop + window.innerHeight
        === document.documentElement.offsetHeight;
      if (atBottom && !this.$store.state.loading) {
        this.getCards();
      }
    };
  }

  async search() {
    this.clear();
    await this.getCards();
  }

  clear() {
    this.cards = [];
    this.$store.dispatch('clear');
  }

  async getCards() {
    await this.$store.dispatch('getCards', { name: this.nameToSearch });
    this.cards = [...this.cards, ...this.$store.state.cards];
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#cards-container {
  width: 960px;
  display: flex;
  flex-wrap: wrap;
}
</style>
