import Vue from 'vue';
import Vuex from 'vuex';
import ESL from '@/api/esl';
import CardModel from '@/models/CardModel';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    cards: Array<CardModel>(),
    currentPage: 1,
    atLastPage: false,
  },
  mutations: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    addCards(state, newCards: CardModel[]) {
      state.cards = [...state.cards, ...newCards];
    },
    increaseCurrentPage(state) {
      state.currentPage += 1;
    },
    reachedLastPage(state) {
      state.atLastPage = true;
    },
    resetState(state) {
      state.currentPage = 1;
      state.cards = [];
    },
  },
  actions: {
    async getCards({ commit, state }, name) {
      const esl = new ESL();

      commit('startLoading');
      const response = await esl.getCards(state.currentPage, name);
      commit('stopLoading');

      if (response.status === 200) {
        const newCards = response.data.cards.map(
          (card: any) => new CardModel(
            card.imageUrl,
            card.name,
            card.text,
            card.set.name,
            card.type,
          )
        );
        commit('addCards', newCards);
        commit('increaseCurrentPage');

        // eslint-disable-next-line no-underscore-dangle
        const atlastPage = !response.data._links || !response.data._links.next;
        if (atlastPage) {
          commit('reachedLastPage');
        }
      } else {
        commit('setError', 'Error loading cards');
      }
    },
    resetState({ commit }) {
      commit('resetState');
    },
    async searchCards({ dispatch }, { name }) {
      await dispatch('getCards', name);
    },
  },
});
