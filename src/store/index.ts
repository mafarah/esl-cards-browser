import Vue from 'vue';
import Vuex from 'vuex';
import ELS from '@/api/els';
import { CARDS_PAGE_SIZE } from '@/constants/values';
import CardModel from '@/models/CardModel';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    newCards: Array<CardModel>(),
    currentPage: 1,
    lastPage: 1,
  },
  mutations: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    setNewCards(state, newCards: CardModel[]) {
      state.newCards = newCards;
    },
    increaseCurrentPage(state) {
      state.currentPage += 1;
    },
    setLastPage(state, newPage) {
      state.lastPage = newPage;
    },
    clear(state) {
      state.currentPage = 1;
      state.newCards = [];
    },
  },
  actions: {
    async getCards({ commit, state }, { name }) {
      const els = new ELS();

      commit('startLoading');
      const response = await els.getCards(state.currentPage, name);
      commit('stopLoading');

      if (response.status === 200) {
        const newCards = response.data.cards.map((card: any) => new CardModel(card));
        commit('setNewCards', newCards);
        commit('increaseCurrentPage');

        // eslint-disable-next-line no-underscore-dangle
        commit('setLastPage', Math.ceil(response.data._totalSize / CARDS_PAGE_SIZE));
      } else {
        commit('setError', 'Error loading cards');
      }
    },
    clear({ commit }) {
      commit('clear');
    },
  },
});
