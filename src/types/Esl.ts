export interface Card {
  name: string;
  rarity: string;
  type: string;
  subtypes: string[];
  cost: number;
  power: number;
  health: number;
  set: Set;
  collectible: boolean;
  soulSummon: number;
  soulTrap: number;
  text: string;
  attributes: string[];
  unique: boolean;
  imageUrl: string;
  id: string;
};

export interface Set {
  id: string;
  name: string;
  _self: string;
};

export interface Links {
  next: string;
  prev: string;
  _pageSize: number;
  _totalCount: number;
};

export interface GetCardsResponse {
  cards: Card[];
  _links: Links;
};
