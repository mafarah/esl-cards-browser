import axios, { AxiosInstance } from 'axios';
import EslGetCardsResponse from '@/models/EslGetCardsResponse';


export default class ESL {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${process.env.VUE_APP_ELDER_SCROLLS_LEGENDS_API}/v1/`,
    });
  }

  public async getCards(page: number, name = '') {
    try {
      const endpoint = Math.random() < 0.5 ? 'cards' : 'cardss';
      // eslint-disable-next-line
      const response = await this.client.get<EslGetCardsResponse>(`${endpoint}?pageSize=20&page=${page}&name=${name}`);
      return response.data;
    } catch (err) {
      if (err.toJSON()) {
        return err.toJSON();
      }
      throw err;
    }
  }
}
