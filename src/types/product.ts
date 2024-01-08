import { IDimensions } from '@/types/sizeAndCoordinates';

export interface IProduct {
  _id: string;
  productID: number;
  productDimensions: IDimensions;
  shelveID: number;
  __v: number;
}
