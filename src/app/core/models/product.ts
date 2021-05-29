import { Unit } from './unit';
/**
 * interface of the Product
 */
export interface Product {
  /** the id of product */
  id: number;
  /** image of product */
  image_url: string;
  /** name of product */
  name: string;
  /**
   * price of product
   */
  price: number;
  /** the shop id  */
  shop_id: string;
  /** units lists */
  units: Unit[];
}
