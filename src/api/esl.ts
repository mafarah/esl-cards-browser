import axios, { AxiosInstance } from 'axios';
import { GetCardsResponse } from '@/types/Esl';
import { CARDS_PAGE_SIZE } from '@/constants/values';


export default class ESL {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${process.env.VUE_APP_ELDER_SCROLLS_LEGENDS_API}/v1/`,
    });
  }

  public async getCards(page: number, name = '') {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('pageSize', CARDS_PAGE_SIZE);
      queryParams.append('page', page.toString());
      if (name !== '') {
        queryParams.append('name', name);
      }
      const response = await this.client.get<GetCardsResponse>(`cards?${queryParams}`);
      return response.data;
    } catch (err) {
      if (err.toJSON()) {
        return err.toJSON();
      }
      throw err;
    }
  }
}
