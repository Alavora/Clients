import { Market } from './market';
/**
 * interface of the shop
 */
export interface Shop {
  id: number;
  name: string;
  cif: string;
  adress: string;
  latitude: number;
  longitude: number;
  image: string;
  phone: string;
  market: Market[];
}
