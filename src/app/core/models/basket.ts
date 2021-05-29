import { Unit } from './unit';
/**
 * interface of Basekt
 */
export interface Basket {
  /** id of basket */
  id: number;
  /** privce of prodcut in basket*/
  price: string;
  /** quantity of product */
  quantity: string;
  /** id of product*/
  product_id: number;
  /** name of product*/
  product_name: string;
  /** status of product*/
  status: string;
  /** total price in basket */
  total_price: number;
  /** unit id  [default]*/
  unit_id: number;
  /** unit symbol  [default*/
  unit_symbol: string;
  /** array of units */
  units: Unit[];
}
