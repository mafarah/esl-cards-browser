import EslSetModel from '@/models/EslSetModel';


export default class EslCardModel {
  name!: string;
  rarity!: string;
  type!: string;
  subtypes!: string[];
  cost!: number;
  power!: number;
  health!: number;
  set!: EslSetModel;
  collectible!: boolean;
  soulSummon!: number;
  soulTrap!: number;
  text!: string;
  attributes!: string[];
  unique!: boolean;
  imageUrl!: string;
  id!: string;
}
