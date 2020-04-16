import Vue from 'vue';
import Vuex from 'vuex';
import ESL from '@/api/esl';
import CardModel from '@/models/CardModel';
import EslCardModel from '@/models/EslCardModel';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    cards: Array<CardModel>(),
    currentPage: 1,
    atLastPage: false,
    error: '',
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
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async getCards({ commit, state }, { name }) {
      const esl = new ESL();

      commit('startLoading');
      const response = await esl.getCards(state.currentPage, name);
      commit('stopLoading');

      if (response.cards) {
        const newCards = response.cards.map(
          (card: EslCardModel) => new CardModel(
            card.imageUrl,
            card.name,
            card.text,
            card.set.name,
            card.type,
          ),
        );
        commit('addCards', newCards);
        commit('increaseCurrentPage');
        commit('setError', '');

        // eslint-disable-next-line no-underscore-dangle
        const atlastPage = !response._links || !response._links.next;
        if (atlastPage) {
          commit('reachedLastPage');
        }
      } else {
        commit('setError', response.message);
      }
    },
    resetState({ commit }) {
      commit('resetState');
    },
  },
});
