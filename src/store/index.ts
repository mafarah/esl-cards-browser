import Vue from 'vue';
import Vuex from 'vuex';
import ELS from '@/api/els';
import { CARDS_PAGE_SIZE } from '@/constants/values';
import CardModel from '@/models/CardModel';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    cards: Array<CardModel>(),
    currentPage: 1,
  },
  mutations: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    setCards(state, newCards: CardModel[]) {
      state.cards = newCards;
    },
    increaseCurrentPage(state) {
      state.currentPage += 1;
    },
    setLastPage(state) {
      state.currentPage += 1;
    },
  },
  actions: {
    async getCards({ commit, state }) {
      const els = new ELS();

      commit('startLoading');
      const response = await els.getCards(state.currentPage);
      commit('stopLoading');

      if (response.status === 200) {
        const cards = response.data.cards.map((card: any) => new CardModel(card));
        commit('setCards', cards);
        commit('increaseCurrentPage');

        // eslint-disable-next-line no-underscore-dangle
        commit('setLastPage', Math.ceil(response.data._totalSize / CARDS_PAGE_SIZE));
      } else {
        commit('setError', 'Error loading cards');
      }
    },
  },
});
