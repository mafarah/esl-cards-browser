import Vue from 'vue';
import Vuex from 'vuex';
import ESL from '@/api/esl';
import CardModel from '@/models/CardModel';
import { Context, State } from '@/types/State';
import { Card as ESlCard } from '@/types/Esl';


Vue.use(Vuex);

export const baseState: State = {
  loading: false,
  cards: Array<CardModel>(),
  currentPage: 1,
  atLastPage: false,
  error: '',
};

export const mutations = {
  setLoading: (state: State, loading: boolean) => { state.loading = loading; },
  addCards: (state: State, newCards: CardModel[]) => {
    state.cards = [...state.cards, ...newCards];
  },
  increaseCurrentPage: (state: State) => { state.currentPage += 1; },
  reachedLastPage: (state: State) => { state.atLastPage = true; },
  resetState: (state: State) => {
    state.currentPage = 1;
    state.cards = [];
  },
  setError: (state: State, error: string) => { state.error = error; },
};

export const actions = {
  getCards: async ({ commit, state }: Context, { name }: { name: string }) => {
    const esl = new ESL();
    commit('setLoading', true);
    const response = await esl.getCards(state.currentPage, name);
    commit('setLoading', false);

    if (response.cards) {
      const newCards = response.cards.map(
        (card: ESlCard) => new CardModel(
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
  resetState({ commit }: Context) {
    commit('resetState');
  },
};

export default new Vuex.Store({
  state: baseState,
  mutations,
  actions,
});
