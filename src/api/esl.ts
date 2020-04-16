import axios, { AxiosInstance } from 'axios';


export default class ESL {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${process.env.VUE_APP_ELDER_SCROLLS_LEGENDS_API}/v1/`,
    });
  }

  public getCards(page: number, name = '') {
    return this.client.get(`cards?pageSize=20&page=${page}&name=${name}`);
  }
}
