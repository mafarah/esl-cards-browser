export default class CardModel {
  imageUrl: string;
  name: string;
  text: string;
  set: string;
  type: string;

  constructor(
    imageUrl: string,
    name: string,
    text: string,
    set: string,
    type: string
  ) {
    this.imageUrl = imageUrl;
    this.name = name;
    this.text = text;
    this.set = set;
    this.type = type;
  }
}
