import { Basket } from './basket';
/** interface of list of baskets */
export interface Baskets {
  basket_id: number;
  shop_id: number;
  shop_name: string;
  items: Basket[];
  status: string;
}
