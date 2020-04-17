<template>
  <div id="main">
    <h1>Elder Scrolls Legends Cards Browser</h1>
    <div>
      <input v-model="nameToSearch" />
      <button @click="search">Search</button>
    </div>
    <cards-container />
    <loading v-if="loading" />
    <div v-if="error">
      <span>Error getting cards</span>
      <button @click="() => getCards({ name: nameToSearch })">Retry</button>
    </div>
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
  computed: mapState(['atLastPage', 'error', 'loading']),
  methods: mapActions(['getCards', 'resetState', 'searchCards']),
})
export default class Main extends Vue {
  nameToSearch = '';

  // mapped properties
  loading!: boolean;
  error!: string;
  atLastPage !: boolean;

  // mapped actions
  getCards!: Function;
  resetState!: Function;

  constructor() {
    super();
    this.getCards({ name: this.nameToSearch });

    const atBottom = document.documentElement.scrollTop + window.innerHeight
      === document.documentElement.offsetHeight;
    window.onscroll = () => this.onScrollHandler(atBottom);
  }

  onScrollHandler(atBottom: boolean) {
    if (atBottom && this.shouldTriggerLoad()) {
      this.getCards({ name: this.getNameToSearch() });
    }
  }

  search() {
    this.resetState();
    this.getCards({ name: this.nameToSearch });
  }

  shouldTriggerLoad() {
    return !this.loading && !this.atLastPage;
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
