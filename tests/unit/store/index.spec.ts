import Vuex from 'vuex';
import { baseState, mutations } from '@/store';
import { Context, State } from '@/types/State';


const state = baseState;
describe('store/index', () => {
  describe('mutations', () => {
    it('startLoading', () => {
      mutations.startLoading(state);
      expect(state.loading).toBeTruthy();
    });
  });
});
