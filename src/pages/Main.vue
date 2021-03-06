<template>
  <div id="main">
    <h1 class="title">{{ t('TITLE') }}</h1>
    <div id="search-bar">
      <input
        id="search-input"
        placeholder="Name"
        v-model="nameToSearch"
        @keyup="keyupHandler" />
      <button
        id="search-button"
        @click="search"
      >
        {{ t('SEARCH_BUTTON_TEXT') }}
      </button>
    </div>
    <div id="content">
      <cards-container />
      <loading v-if="loading" />
      <div v-if="error">
        <span class="error-message">{{ t('ERROR_LOADING') }}</span>
        <button
          @click="() => getCards({ name: nameToSearch })"
        >{{ t('RETRY_BUTTON_TEXT') }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

import CardsContainer from '@/components/CardsContainer.vue';
import Loading from '@/components/Loading.vue';
import t from '@/utils/messages';
import * as values from '@/constants/values';


@Component({
  components: {
    CardsContainer,
    Loading,
  },
  computed: mapState(['atLastPage', 'error', 'loading']),
  methods: {
    t,
    ...mapActions(['getCards', 'resetState', 'searchCards']),
  },
})
export default class Main extends Vue {
  nameToSearch = '';
  initialSearchBarOffsetTop!: number;

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

    window.onscroll = () => this.onScrollHandler(Main.atBottom(), document.getElementById('search-bar'));
  }

  onScrollHandler(atBottom: boolean, searchBar: HTMLElement | null) {
    if (atBottom && this.shouldTriggerLoad()) {
      this.getCards({ name: this.getNameToSearch() });
    }

    if (searchBar !== null) {
      // saves the initial position of the search bar so we know where to put it back
      if (!this.initialSearchBarOffsetTop) {
        this.initialSearchBarOffsetTop = searchBar.offsetTop;
      }
      // if the search bar reaches the top it remains there
      if (window.pageYOffset >= this.initialSearchBarOffsetTop) {
        searchBar.classList.add('sticky');
      } else {
        searchBar.classList.remove('sticky');
      }
    }
  }

  // returns true if scroll position is values.INFINITE_SCROLL_OFFSET or less from the bottom
  static atBottom() {
    return document.documentElement.scrollTop + window.innerHeight + values.INFINITE_SCROLL_OFFSET
      > document.documentElement.offsetHeight;
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
    // executes it if the user presses Enter
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

button {
  background-color: $palette-primary;
  border: 0;
  font-family: $font-family;
  font-size: 14px;
  font-weight: bold;
  height: 30px;
  margin: 10px;
}

.error-message {
  font-size: 20px;
}

#search-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid $palette-secondary;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: black;
}

.sticky + #content {
  padding-top: 30px;
}

#content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
