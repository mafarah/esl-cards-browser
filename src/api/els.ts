import axios, { AxiosInstance } from 'axios';


export default class ELS {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${process.env.VUE_APP_ELDER_SCROLLS_LEGENDS_API}/v1/`,
    });
  }

  public getCards(page: number) {
    return this.client.get(`cards?page=${page}&pageSize=20`);
  }
}
