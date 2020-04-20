import { baseState, actions, mutations } from '@/store';
import CardModel from '@/models/CardModel';


jest.mock('@/api/esl', () => jest.fn().mockImplementation(() => ({
  getCards: jest.fn(() => ({
    cards: [{
      imageUrl: 'imageUrl',
      name: 'name',
      text: 'text',
      set: { name: 'set' },
      type: 'type',
    }],
    _links: {},
  })),
})));

const newCards = [new CardModel(
  'imageUrl',
  'name',
  'text',
  'set',
  'type',
)];

const state = baseState;
describe('store/index', () => {
  describe('mutations', () => {
    it('startLoading', () => {
      mutations.setLoading(state, true);
      expect(state.loading).toBeTruthy();
    });

    it('addCards', () => {
      mutations.addCards(state, newCards);
      expect(state.cards).toEqual(newCards);
    });

    it('increaseCurrentPage', () => {
      mutations.increaseCurrentPage(state);
      expect(state.currentPage).toEqual(2);
    });

    it('reachedLastPage', () => {
      mutations.reachedLastPage(state);
      expect(state.atLastPage).toBeTruthy();
    });

    it('resetState', () => {
      mutations.resetState(state);
      expect(state.currentPage).toEqual(1);
      expect(state.cards).toEqual([]);
      expect(state.atLastPage).toEqual(false);
    });

    it('setError', () => {
      mutations.setError(state, 'error');
      expect(state.error).toEqual('error');
    });
  });

  describe('actions', () => {
    it('getCards', async () => {
      const commit = jest.fn();
      await actions.getCards({ commit, state }, { name: 'name' });
      const expectedCalls = [
        ['setLoading', true],
        ['setLoading', false],
        ['addCards', newCards],
        ['increaseCurrentPage'],
        ['setError', ''],
        ['reachedLastPage']];
      expect(commit.mock.calls).toEqual(expectedCalls);
    });

    it('resetState', () => {
      const commit = jest.fn();
      actions.resetState({ commit, state });
      const expectedCalls = [['resetState']];
      expect(commit.mock.calls).toEqual(expectedCalls);
    });
  });
});
