import { Unit } from './unit';
/**
 * interface of Basekt
 */
export interface Basket {
  id: number;
  price: string;
  quantity: string;
  product_id: number;
  product_name: string;
  status: string;
  total_price: number;
  unit_id: number;
  unit_symbol: string;
  units: Unit[];
}
