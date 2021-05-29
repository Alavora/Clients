import { Basket } from './basket';
/** interface of list of baskets */
export interface Baskets {
  /** basket_id */
  basket_id: number;
  /** shop_id */
  shop_id: number;
  /** shop_name */
  shop_name: string;
  /** items[products] */
  items: Basket[];
  /** status */
  status: string;
}
