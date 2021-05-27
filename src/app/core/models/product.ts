import { Unit } from './unit';
export interface Product{
  id:number;
  image_url:string;
  name: string;
  price: number;
  shop_id:string;
  units: Unit[];
 }
