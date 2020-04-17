import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import Main from '@/pages/Main.vue';


describe('App.vue', () => {
  it('renders the App', () => {
    const wrapper = shallowMount(App);

    expect(wrapper.contains(Main)).toBeTruthy();
  });
});
