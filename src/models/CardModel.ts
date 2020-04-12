export default class CardModel {
  imageUrl: string;
  name: string;
  text: string;
  set: string;
  type: string;

  constructor(card: any) {
    this.imageUrl = card.imageUrl;
    this.name = card.name;
    this.text = card.text;
    this.set = card.set.name;
    this.type = card.type;
  }
}
