import CardModel from '@/models/CardModel';
import { Commit } from 'vuex';


export interface State {
  loading: boolean;
  cards: CardModel[];
  currentPage: number;
  atLastPage: boolean;
  error: string;
};

export interface Context {
  commit: Commit;
  state: State;
};
