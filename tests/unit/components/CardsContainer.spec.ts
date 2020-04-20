import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Card from '@/components/Card.vue';
import CardsContainer from '@/components/CardsContainer.vue';
import CardModel from '@/models/CardModel';


const localVue = createLocalVue();
localVue.use(Vuex);

describe('CardsContainer.vue', () => {
  const state = {
    cards: [new CardModel(
      'imageUrl',
      'name',
      'text',
      'set',
      'type',
    )],
  };

  const store = new Vuex.Store({ state });

  it('renders a CardsContainer component with a Card inside', () => {
    const wrapper = shallowMount(CardsContainer, { store, localVue });
    const html = wrapper.html();

    expect(html).toContain('<div id="cards-container">');
    expect(wrapper.contains(Card)).toBeTruthy();
  });
});
