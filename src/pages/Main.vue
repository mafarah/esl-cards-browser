<template>
  <div id="main">
    <h1 class="title">Elder Scrolls Legends Cards Browser</h1>
    <div>
      <input
        id="search-input"
        placeholder="Name"
        v-model="nameToSearch"
        @keyup="keyupHandler" />
      <button
        id="search-button"
        @click="search"
      >
        SEARCH
      </button>
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

    window.onscroll = () => this.onScrollHandler(Main.atBottom());
  }

  onScrollHandler(atBottom: boolean) {
    if (atBottom && this.shouldTriggerLoad()) {
      this.getCards({ name: this.getNameToSearch() });
    }
  }

  static atBottom() {
    return document.documentElement.scrollTop + window.innerHeight
      === document.documentElement.offsetHeight;
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

  keyupHandler(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.search();
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

#main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  color: $palette-primary;
  text-align: center;
  text-shadow: 0px 0px 10px $palette-primary;
}

#search-input {
  background-color: $palette-secondary;
  border: 0;
  font-family: $font-family;
  font-size: 16px;
  height: 30px;
  margin: 10px;
  padding-left: 5px;
}

#search-button {
  background-color: $palette-primary;
  border: 0;
  font-family: $font-family;
  font-size: 14px;
  font-weight: bold;
  height: 30px;
  margin: 10px;
}
</style>
