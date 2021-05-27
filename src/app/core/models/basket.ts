import { Unit } from './unit';
export interface Basket{
  id:number;
  price : string;
  product_id: number;
  product_name: string;
  status: string;
  total_price: number;
  unit_id: number;
  unit_symbol: string;
  units: Unit[];
 }
