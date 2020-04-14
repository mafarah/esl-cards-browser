<template>
  <div id="main">
    <h1>Elder Scrolls Legends Cards Browser</h1>
    <div>
      <input v-model="nameToSearch" />
      <button @click="search">Search</button>
    </div>
    <cards-container />
    <loading v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CardsContainer from '@/components/CardsContainer.vue';
import Loading from '@/components/Loading.vue';
import { mapState, mapActions } from 'vuex';


@Component({
  components: {
    CardsContainer,
    Loading,
  },
  computed: mapState(['loading']),
  methods: mapActions(['getCards', 'resetState', 'searchCards']),
})
export default class Main extends Vue {
  nameToSearch = '';

  // mapped properties
  loading!: boolean;

  // mapped actions
  getCards!: Function;
  resetState!: Function;
  searchCards!: Function;

  constructor() {
    super();
    this.getCards();

    const onScrollHandler = () => {
      const atBottom = document.documentElement.scrollTop + window.innerHeight
        === document.documentElement.offsetHeight;
      if (atBottom && this.shouldTriggerLoad()) {
        if (this.getNameToSearch()) {
          this.searchCards({ name: this.getNameToSearch() });
        } else {
          this.getCards();
        }
      }
    };
    window.onscroll = onScrollHandler;
  }

  search() {
    this.resetState();
    this.searchCards({ name: this.nameToSearch });
  }

  shouldTriggerLoad() {
    return !this.loading;
  }

  getNameToSearch() {
    return this.nameToSearch;
  }
}
</script>

<style lang="scss">
#main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
