import { shallowMount } from '@vue/test-utils';
import Loading from '@/components/Loading.vue';


describe('Loading.vue', () => {
  it('renders a Loading component', () => {
    const wrapper = shallowMount(Loading);
    const html = wrapper.html();
    expect(html).toContain('<div class="lds-ellipsis">');
  });
});
