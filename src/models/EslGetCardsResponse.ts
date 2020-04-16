import EslCardModel from '@/models/EslCardModel';
import EslLinksResponse from '@/models/EslLinksResponse';


export default class EslGetCardsResponse {
  cards!: EslCardModel[];
  _links!: EslLinksResponse;
}
