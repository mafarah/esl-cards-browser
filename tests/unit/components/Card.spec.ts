import { shallowMount } from '@vue/test-utils';
import Card from '@/components/Card.vue';
import CardModel from '@/models/CardModel';


describe('Card.vue', () => {
  it('renders CardModel props', () => {
    const card = new CardModel(
      'imageUrl',
      'name',
      'text',
      'set',
      'type',
    );
    const wrapper = shallowMount(Card, {
      propsData: { card },
    });
    const html = wrapper.html();
    expect(html).toContain('<img src="imageUrl" class="image">');
    expect(html).toContain('<li>Name: name</li>');
    expect(html).toContain('<li>Text: text</li>');
    expect(html).toContain('<li>Set: set</li>');
    expect(html).toContain('<li>Type: type</li>');
  });
});
