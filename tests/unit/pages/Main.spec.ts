import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Main from '@/pages/Main.vue';
import CardsContainer from '@/components/CardsContainer.vue';
import Loading from '@/components/Loading.vue';
import CardModel from '@/models/CardModel';


const localVue = createLocalVue();
localVue.use(Vuex);

describe('Main.vue', () => {
  beforeEach(() => {
    store = new Vuex.Store({ state: baseState, actions });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const card = new CardModel(
    'imageUrl',
    'name',
    'text',
    'set',
    'type',
  );

  let store: any;

  const actions = {
    getCards: jest.fn(() => [card]),
    resetState: jest.fn(),
  };

  const baseState = {
    loading: false,
    error: '',
    atLastPage: false,
  };

  it('renders Main page', () => {
    const wrapper = shallowMount(Main, { store, localVue });
    const html = wrapper.html();

    expect(wrapper.contains(CardsContainer)).toBeTruthy();
    expect(html).toContain('<input id="search-input"');
    expect(html).toContain('<button id="search-button"');

    expect(actions.getCards).toHaveBeenCalledWith(expect.any(Object), { name: '' });
    expect(window.onscroll).toBeInstanceOf(Function);
  });

  it('renders Main page with a Loading component', () => {
    const newState = { ...baseState, loading: true };
    store = new Vuex.Store({ state: newState, actions });

    const wrapper = shallowMount(Main, { store, localVue });

    expect(wrapper.contains(Loading)).toBeTruthy();
  });

  it('renders Main page with an error message', () => {
    const newState = { ...baseState, error: 'Error' };
    store = new Vuex.Store({ state: newState, actions });

    const wrapper = shallowMount(Main, { store, localVue });
    const html = wrapper.html();

    expect(html).toContain('<button>RETRY</button>');
  });

  it('executes search method', () => {
    const wrapper: any = shallowMount(Main, { store, localVue });
    wrapper.vm.nameToSearch = 'name';
    wrapper.vm.search();

    expect(actions.resetState).toHaveBeenCalled();
    expect(actions.getCards).toHaveBeenCalledWith(expect.any(Object), { name: 'name' });
  });

  it('shouldTriggerLoad method should return true', () => {
    const wrapper: any = shallowMount(Main, { store, localVue });

    expect(wrapper.vm.shouldTriggerLoad()).toBeTruthy();
  });

  it('shouldTriggerLoad method should return false because it is loading', () => {
    const newState = { ...baseState, loading: true };
    store = new Vuex.Store({ state: newState, actions });

    const wrapper: any = shallowMount(Main, { store, localVue });

    expect(wrapper.vm.shouldTriggerLoad()).toBeFalsy();
  });

  it('shouldTriggerLoad method should return false because it is atLastPage', () => {
    const newState = { ...baseState, atLastPage: true };
    store = new Vuex.Store({ state: newState, actions });

    const wrapper: any = shallowMount(Main, { store, localVue });

    expect(wrapper.vm.shouldTriggerLoad()).toBeFalsy();
  });

  it('getNameToSearch method should return nameToSearch', () => {
    const wrapper: any = shallowMount(Main, { store, localVue });
    wrapper.vm.nameToSearch = 'name';

    expect(wrapper.vm.getNameToSearch()).toBe('name');
  });

  it('onScrollHandler method calls getCards', () => {
    const wrapper: any = shallowMount(Main, { store, localVue });
    const searchBar = document.createElement('div');

    wrapper.vm.nameToSearch = 'name';
    wrapper.vm.onScrollHandler(true, searchBar);

    expect(actions.getCards).toHaveBeenCalledWith(expect.any(Object), { name: 'name' });
  });

  it('onScrollHandler method should not call getCards', () => {
    const wrapper: any = shallowMount(Main, { store, localVue });

    wrapper.vm.nameToSearch = 'name';
    wrapper.vm.onScrollHandler(false, null);

    expect(actions.getCards).not.toHaveBeenCalledWith(expect.any(Object), { name: 'name' });
  });

  it('keyupHandler method should call search', () => {
    const wrapper: any = shallowMount(Main, { store, localVue });

    wrapper.vm.search = jest.fn();
    wrapper.vm.keyupHandler({ keyCode: 13 });

    expect(wrapper.vm.search).toHaveBeenCalled();
  });

  it('keyupHandler method should not call search', () => {
    const wrapper: any = shallowMount(Main, { store, localVue });

    wrapper.vm.search = jest.fn();
    wrapper.vm.keyupHandler({ keyCode: 14 });

    expect(wrapper.vm.search).not.toHaveBeenCalled();
  });
});
