import { Market } from './market';
export interface Shop{
 id:number;
 name: string;
 cif: string;
 adress: string;
 latitude: number;
 longitude: number;
 image: string;
 phone: string;
 market: Market[];

}
