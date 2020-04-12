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
    <loading v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import Card from '@/components/Card.vue';
import Loading from '@/components/Loading.vue';
import CardModel from '@/models/CardModel';


@Component({
  components: {
    Card,
    Loading,
  },
  computed: mapState(['loading', 'newCards']),
  methods: mapActions(['getCards']),
})
export default class App extends Vue {
  cards: CardModel[];
  nameToSearch = '';

  // mapped properties
  newCards!: CardModel[];
  loading!: boolean;

  // mapped actions
  getCards!: Function;

  constructor() {
    super();
    this.cards = [];
    this.getMoreCards();

    window.onscroll = () => {
      const atBottom = document.documentElement.scrollTop + window.innerHeight
        === document.documentElement.offsetHeight;
      if (atBottom && !this.loading) {
        this.getMoreCards();
      }
    };
  }

  async search() {
    this.clear();
    await this.getMoreCards();
  }

  clear() {
    this.cards = [];
    this.$store.dispatch('clear');
  }

  async getMoreCards() {
    // await this.$store.dispatch('getCards', { name: this.nameToSearch });
    await this.getCards({ name: this.nameToSearch });
    this.cards = [...this.cards, ...this.newCards];
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
